import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from "../../constants/Palette";
import logo from '../../assets/images/logo.jpg';
import { usePassenger } from "../../context/PassengerProvider";
import Toast from "../../components/Toast";
import { useBooking } from "../../context/BookingProvider";
import { PassengerData, Passenger } from '../../utils/entity/PageEntity';

const Ticket: React.FC = () => {
    const ticketRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const { bookingDetails } = useBooking();
    const { passengers } = usePassenger();

    console.log("passenger data in ticket:", passengers);
    const email = passengers.length > 0 ? passengers[0].email : '';
    const phoneNumber = passengers.length > 0 ? passengers[0].phoneNumber : '';
    const ticketId = passengers.length > 0 ? passengers[0].ticketId : '';
    const busNumber = passengers.length > 0 ? passengers[0].busNumber : '';

    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        console.log("Passengers updated:", passengers);
    }, [passengers]);

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
            window.open(blobUrl);

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
        { key: 'ticketid', label: 'Ticket No', value: bookingDetails?.bus.tripNumber },
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
                            <img src={logo} alt="logo" width='90px' height='90x' />
                        </div>
                        <div>
                            <p><b>Need help with your trip?</b></p>
                            <p>0522-2454444</p>
                            <p>care@bus.com</p>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0 0px 0" }} />
                    <div className="ticket-content d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h3 style={{ margin: "0 10px 0 0" }}>{fields.find(field => field.key === 'from')?.value}</h3>
                            <img
                                src="https://img.icons8.com/?size=100&id=n2C7Bts7cbWW&format=png&color=000000"
                                alt="arrow-icon"
                                style={{ height: "20px", width: "20px", margin: "0 10px" }}
                            />
                            <h3 style={{ margin: "5 0px 0 0" }}>{fields.find(field => field.key === 'to')?.value},</h3>
                            <h3 style={{ margin: "0" }}>{fields.find(field => field.key === 'date')?.value}</h3>
                        </div>
                        <div>
                            <p><b>Ticket no:</b> {fields.find(field => field.key === 'ticketid')?.value}</p>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        {fields.filter(field => ['busName', 'reportingTime', 'departureTime'].includes(field.key)).map((field, index) => (
                            <div key={index}>
                                <b><h5>{field.value}</h5></b>
                                <p>{field.label}</p>
                            </div>
                        ))}
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        {fields.filter(field => ['boardingPoint', 'seatNumbers', 'departurePoint'].includes(field.key)).map((field, index) => (
                            <div key={index}>
                                <b><h5>{field.value}</h5></b>
                                <p>{field.label}</p>
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
                                        <th style={textStyle}>Phone Number</th>
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
                                                <td style={textStyle}>{phoneNumber}</td>
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
                    <div style={{ marginTop: "20px" }}>
                        <h4 style={{ textAlign: "center" }}><b>Terms and Conditions</b></h4>
                        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px", marginLeft: '5px', marginRight: '5px' }}>
                            <div style={{ width: "45%" }}>
                                <p>1. Arrival Time: Passengers must arrive at least 30 minutes before the scheduled departure time. This allows for sufficient time to complete the boarding process and avoid delays. Arriving early also helps ensure that all passengers can comfortably board the bus without any rush or confusion.</p>
                                <p>2. ID Verification: It is mandatory to carry a valid photo ID proof during the journey. The ticket and the ID will be verified before boarding to ensure the safety and security of all passengers. Without a valid ID, boarding will not be allowed, and no refunds will be provided.</p>
                                <p>3. No Refunds: Once a ticket has been issued and the payment has been processed, the ticket is non-refundable. In case of cancellations, no amount will be refunded, regardless of the reason for cancellation. Please ensure you are committed to the journey before booking the ticket.</p>
                                <p>4. Lost or Stolen Items: The bus company is not responsible for any lost or stolen belongings during the journey. Passengers are advised to keep their personal belongings safe and secure at all times. It is recommended to avoid carrying valuables unless necessary.</p>
                            </div>
                            <div style={{ width: "45%" }}>
                                <p>5. Safety Guidelines: Passengers must adhere to all safety guidelines provided by the bus company during the trip. This includes following instructions from the staff, wearing seat belts (if provided), and staying seated during the journey for your safety and the safety of others.</p>
                                <p>6. Prohibited Items: Smoking, consuming alcohol, or engaging in any inappropriate behavior is strictly prohibited on the bus. Passengers who violate these rules may be asked to leave the bus at the nearest stop without any refund. The company reserves the right to take further legal action if necessary.</p>
                                <p>7. Trip Cancellation or Rescheduling: The company reserves the right to cancel or reschedule the trip due to unforeseen circumstances, such as technical issues, weather conditions, or other emergencies. In such cases, passengers will be informed in advance, and alternate arrangements will be made where possible.</p>
                                <p>8. Behavior During the Journey: Passengers must follow the instructions of the bus staff and behave respectfully during the trip. Any form of harassment, disturbance, or inappropriate behavior towards fellow passengers or staff will not be tolerated and may lead to removal from the bus.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center d-flex justify-content-center align-items-center mt-4">
                        <div>
                            <button
                                className="btn btn-primary mx-4"
                                onClick={(event) => {
                                    event.preventDefault();
                                    downloadTicket();
                                }}>
                                Download PDF
                            </button>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={(event) => {
                                    event.preventDefault();
                                    generateAndSendPDF();
                                }}
                                style={{ fontSize: "16px" }}
                            >
                                Share PDF
                            </button>
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
