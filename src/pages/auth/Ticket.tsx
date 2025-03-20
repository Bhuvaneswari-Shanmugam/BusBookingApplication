import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from 'react-toastify';
import { colors } from "../../constants/Palette";
import logo from '../../assets/images/logo.jpg';
import { usePassenger } from "../../context/PassengerProvider";
import Toast from "../../components/Toast";
import { useBooking } from "../../context/BookingProvider";
import { Passenger } from "../../utils/entity/PassengerInterface";
import { useCreateTicketMutation } from "../../redux/services/TicketApi";
import { termsAndConditions } from "../../constants";
import Button from "../../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Ticket: React.FC = () => {
    const ticketRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const apiCalled = useRef(false);

    const { bookingDetails } = useBooking();
    const { passengers } = usePassenger();

    const email = passengers.length > 0 ? passengers[0].email : '';
    const phoneNumber = passengers.length > 0 ? passengers[0].phoneNumber : '';
    const ticketId = passengers.length > 0 ? passengers[0].ticketId : '';
    const busNumber = passengers.length > 0 ? passengers[0].busNumber : '';

    const [ticketUrl, setTicketUrl] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
    const [showToast, setShowToast] = useState<boolean>(false);

    const [createTicket] = useCreateTicketMutation();

    useEffect(() => {
        const storeTicket = async () => {
            if (apiCalled.current) return;
            apiCalled.current = true;

            try {
                if (ticketRef.current) {
                    const canvas = await html2canvas(ticketRef.current);
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4");
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                    const pdfBlob = pdf.output("blob");
                    const blobUrl = URL.createObjectURL(pdfBlob);

                    const ticketUrl = blobUrl.slice(5);

                    setTicketUrl(ticketUrl);

                    await createTicket({ ticketUrl: ticketUrl, ticketId: ticketId }).unwrap();
                }
            } catch (err) {
                console.log("error storing ticket : ", err);
            }
        };

        storeTicket();
    }, [ticketId, createTicket]);

    const downloadTicket = async () => {
        try {
            if (ticketRef.current) {
                const canvas = await html2canvas(ticketRef.current);
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save("ticket.pdf");
                toast.success("Ticket downloaded successfully!");
                setToastType('success');
                setShowToast(true);

            }
        } catch (err) {
            toast.error("Error while downloading ticket!");
            setToastType('error');
            setShowToast(true);
        }
    }

    const generateAndSendPDF = async () => {
        if (ticketRef.current) {
            const canvas = await html2canvas(ticketRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output("blob");
            const blobUrl = URL.createObjectURL(pdfBlob);
            setTicketUrl(blobUrl);

            const formData = new FormData();
            formData.append("email", email);
            formData.append("subject", "Your Ticket");
            formData.append("body", "Here is your bus ticket.");
            formData.append("file", pdfBlob, "ticket.pdf");

            try {
                const response = await fetch("http://localhost:8080/email/send-file", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    setToastMessage("Email sent successfully!");
                    setToastType('success');
                    setShowToast(true);
                    navigate("/home");
                } else {
                    setToastMessage("Failed to send email.");
                    setToastType('error');
                    setShowToast(true);
                }
            } catch (error) {
                setToastMessage("Error sending email.");
                setToastType('error');
                setShowToast(true);
            }
        }
    };

    const fields = [
        { key: 'from', label: 'From', value: bookingDetails?.bus.pickupPoint },
        { key: 'to', label: 'To', value: bookingDetails?.bus.droppingPoint },
        { key: 'date', label: 'Date', value: bookingDetails?.date },
        { key: 'ticketid', label: 'Ticket Id', value: ticketId },
        { key: 'boardingPoint', label: 'Boarding Point', value: bookingDetails?.bus.pickupPoint },
        { key: 'busName', label: 'Bus Name', value: `${bookingDetails?.bus.name} ${bookingDetails?.bus.type}` },
        { key: 'reportingTime', label: 'Reporting Time', value: bookingDetails?.bus.departureTime },
        { key: 'departureTime', label: 'Departure Time', value: bookingDetails?.bus.departureTime },
        { key: 'seatNumbers', label: 'Seat Numbers', value: bookingDetails?.currentSelectedSeats?.join(", ") || "N/A" },
        { key: 'departurePoint', label: 'Departure Point', value: bookingDetails?.bus.droppingPoint },
    ];

    const textStyle = { color: colors.secondary };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ marginLeft: '0px', marginRight: '0px' }}>
            <div
                className="card ticket-card shadow-lg m-4"
                ref={ticketRef}
                style={{
                    width: "850px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    backgroundColor: colors.background,
                    height: "auto",
                }}
            >
                <div className="card-body" style={textStyle}>
                    <div className="ticket-head-content d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div>
                            <div className="d-flex align-items-center mb-3 ">
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="cursor-pointer mt-5" 
                                    onClick={() => navigate(-1)}
                                    style={{ fontSize: "20px", color: "black" }}
                                />
                                <div className="ms-3"> 
                                    <p className="mb-1 fw-bold text-start">Need help with your trip?</p>
                                    <p className="mb-1 mailto:text-start">bigtranzriders@gmail.com</p>
                                    <p className="mb-1 text-start">0522-2454444</p>
                                </div>
                            </div>


                        </div>
                        <img src={logo} alt="logo" width="90px" height="90px" />
                    </div>

                    <hr style={{ margin: "5px 0 0px 0" }} />
                    <div className="ticket-content d-flex justify-content-between align-items-center mx-3">
                        <div className="d-flex align-items-center">
                            <h3 className="mb-0 me-2">
                                {fields.find(field => field.key === 'from')?.value}
                            </h3>
                            <img
                                src="https://img.icons8.com/?size=100&id=n2C7Bts7cbWW&format=png&color=000000"
                                alt="arrow-icon"
                                className="me-2"
                                style={{ height: "20px", width: "20px" }}
                            />
                            <h3 className="mb-0 me-2">
                                {fields.find(field => field.key === 'to')?.value},
                            </h3>
                            <h3 className="mb-0">
                                {fields.find(field => field.key === 'date')?.value}
                            </h3>
                        </div>
                        <div>
                            <p className="mb-0"><b>Ticket no:</b> {fields.find(field => field.key === 'ticketid')?.value}</p>
                        </div>
                    </div>

                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-start mx-3">
                        {fields.filter(field => ['busName', 'reportingTime', 'departureTime'].includes(field.key)).map((field, index) => (
                            <div key={index} className="text-center">
                                <p className="mb-0">{field.label}</p>
                                <h5 className="mb-1"><b>{field.value}</b></h5>

                            </div>
                        ))}
                    </div>

                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        {fields.filter(field => ['boardingPoint', 'seatNumbers', 'departurePoint'].includes(field.key)).map((field, index) => (
                            <div key={index}>
                                <p>{field.label}</p>
                                <h5 className="fw-bold">{field.value}</h5>
                            </div>
                        ))}
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <b><h5>Customer Info</h5></b>
                            </div>
                            <table className="table table-bordered" style={textStyle}>
                                <thead>
                                    <tr className="" style={textStyle}>
                                        <th style={textStyle}>Name</th>
                                        <th style={textStyle}>Age</th>
                                        <th style={textStyle}>Gender</th>
                                        <th style={textStyle}>Email</th>
                                        <th style={textStyle}>Bus Number</th>
                                        <th style={textStyle}>Seat Number</th>
                                        <th style={textStyle}>Ticket ID</th>
                                    </tr>
                                </thead>
                                <tbody className="" style={textStyle}>
                                    {Array.isArray(passengers) &&
                                        passengers.length > 0 &&
                                        passengers[0].passengers.map((passenger: Passenger, index: number) => (
                                            <tr key={index}>
                                                <td style={textStyle}>{passenger.firstName} {passenger.lastName}</td>
                                                <td style={textStyle}>{passenger.age}</td>
                                                <td style={textStyle}>{passenger.gender}</td>
                                                <td style={textStyle}>{email}</td>
                                                <td style={textStyle}>{busNumber}</td>
                                                <td style={textStyle}>{passenger.seatNumber}</td>
                                                <td style={textStyle}>{ticketId}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="row mt-3 mx-1">
                        <div className="col-md-6 d-flex flex-column">
                            {termsAndConditions.slice(0, 4).map((term) => (
                                <p className="mb-2 text-start ">
                                    <span className="fw-bold">{term.content.split(":")[0]}:</span> {term.content.split(":")[1]}
                                </p>
                            ))}
                        </div>
                        <div className="col-md-6 d-flex flex-column">
                            {termsAndConditions.slice(4).map((term) => (
                                <p className="mb-2 text-start ">
                                    <span className="fw-bold">{term.content.split(":")[0]}:</span> {term.content.split(":")[1]}
                                </p>
                            ))}
                        </div>
                    </div>



                    <div className="text-center d-flex justify-content-center align-items-center mt-4">
                        <div>
                            <Button
                                className="btn  mx-4 border-0"
                                style={{ backgroundColor: colors.pagecolor }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    downloadTicket();
                                }}>
                                Download PDF
                            </Button>
                        </div>
                        <div>
                            <Button
                                className="btn  border-0"
                                style={{ backgroundColor: colors.pagecolor, fontSize: "16px" }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    generateAndSendPDF();
                                }}

                            >
                                Share PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default Ticket;
