import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from 'react-toastify';
import { colors } from "../../constants/Palette";
import logo from '../../assets/images/logo.jpg';
import Toast from "../../components/Toast";
import { useBooking } from "../../context/BookingProvider";
import { Passenger } from "../../utils/entity/PassengerInterface";
import { useCreateTicketMutation } from "../../redux/services/TicketApi";
import { termsAndConditions } from "../../constants/ticketConstants";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Ticket: React.FC = () => {
    const ticketRef = useRef<HTMLDivElement | null>(null);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [ticketUrl, setTicketUrl] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const { bookingDetails } = useBooking();
    const navigate = useNavigate();
    const apiCalled = useRef(false);

   
    const [createTicket] = useCreateTicketMutation();
    const location = useLocation();

    const selectedDroppingPoints = JSON.parse(localStorage.getItem('selectedDroppingPoints') || 'N/A');
    const selectedPickupPoints = JSON.parse(localStorage.getItem('selectedPickupPoints') || 'N/A');
    const passengerContextData = JSON.parse(localStorage.getItem('passengersData') || '{}');
    const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');

    const email = passengerContextData?.email || '';
    const phoneNumber = passengerContextData?.phoneNumber || '';
    const ticketId = passengerContextData?.ticketId || '';
    const busNumber = passengerContextData?.busNumber || '';

    const uploadPdf = async (pdfBlob: Blob) => {
        const formData = new FormData();
        formData.append("file", pdfBlob, `${ticketId}.pdf`);

        try {
            const response = await fetch("http://localhost:8080/email/ticket-upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Ticket uploaded successfully to AWS!");
            } else {
                alert("Ticket upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    useEffect(() => {
        const processTicket = async () => {
            if (apiCalled.current) return;
            apiCalled.current = true;

            try {
                // Step 1: Store the Ticket
                if (ticketRef.current) {
                    console.log("Capturing ticket element...");
                    const canvas = await html2canvas(ticketRef.current);
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4");
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    console.log("Adding image to PDF...");
                    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                    const ticketPdf = pdf.output("blob");
                    setPdfBlob(ticketPdf);
                    const blobUrl = URL.createObjectURL(ticketPdf);

                    const ticketUrl = blobUrl.slice(5);
                    setTicketUrl(ticketUrl);

                    console.log("Storing ticket with URL:", ticketUrl);
                    await createTicket({ ticketUrl: ticketUrl, ticketId: ticketId }).unwrap();
                    setToastMessage("Ticket stored successfully!");
                    setToastType('success');
                    setShowToast(true);
                } else {
                    console.error("ticketRef.current is null");
                }

                // Step 2: Fetch Payment Details
                const queryParams = new URLSearchParams(location.search);
                const sessionId = queryParams.get('session_id');

                if (sessionId) {
                    console.log('Session ID method called:', sessionId);
                    const response = await axios.post(`http://localhost:8082/stripe-payment/payment-details/${sessionId}`);
                    console.log('Payment details response:', response.data);

                    if (response.data && response.data.status) {
                        setPaymentStatus(response.data.status);
                        setToastMessage("Payment details received!");
                        setToastType('success');
                        setShowToast(true);
                    } else {
                        console.error('Payment details response does not contain status');
                    }
                } else {
                    console.error('Session ID is not available');
                }
            } catch (err) {
                console.error("Error processing ticket:", err);
                setToastMessage("Error processing ticket");
                setToastType('error');
                setShowToast(true);
            }
        };

        processTicket();
    }, [location.search, ticketId, createTicket]);

    useEffect(() => {
        const uploadTicket = async () => {
            if (pdfBlob && paymentStatus === 'succeeded') {
                console.log("PDF Blob is available. Proceeding with upload...");
                await uploadPdf(pdfBlob);
            } else {
                console.log("PDF Blob is not available or payment was not successful. Payment Status:", paymentStatus);
            }
        };

        uploadTicket();
    }, [pdfBlob, paymentStatus]);

    const downloadTicket = async () => {
        try {
            if (ticketRef.current) {
                const canvas = await html2canvas(ticketRef.current);
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`ticket_${ticketId}.pdf`);

                setToastMessage("Ticket downloaded successfully!");
                setToastType('success');
                setShowToast(true);
            }
        } catch (err) {
            setToastMessage("Error while downloading ticket");
            setToastType('error');
            setShowToast(true);
        }
    };

    const emailTicket = async () => {
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
            formData.append("file", pdfBlob, `ticket_${ticketId}.pdf`);

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
        { key: 'from', label: 'From', value: bookingData?.pickupPoint },
        { key: 'to', label: 'To', value: bookingData?.destinationPoint },
        { key: 'date', label: 'Date', value: bookingData?.pickupTime },
        { key: 'ticketid', label: 'Ticket Id', value: ticketId },
        { key: 'boardingPoint', label: 'Boarding Point', value: selectedPickupPoints || "N/A" },
        { key: 'departurePoint', label: 'Departure Point', value: selectedDroppingPoints || "N/A" },
        { key: 'seatNumbers', label: 'Seat Numbers', value: bookingData?.bookedSeats?.join(", ") || "N/A" },
        { key: 'perSeatAmount', label: 'Per Seat Amount', value: bookingData?.perSeatAmount },
        { key: 'totalAmount', label: 'Total Amount', value: bookingData?.totalAmount },
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
                                    {Array.isArray(passengerContextData?.passengers) &&
                                        passengerContextData.passengers.length > 0 &&
                                        passengerContextData.passengers.map((passenger: Passenger, index: number) => (
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
                                    emailTicket();
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
