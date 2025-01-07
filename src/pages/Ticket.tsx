import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { PassengerForTicket, Customer } from '../utils/entity/PageEntity';

const Ticket: React.FC = () => {
    const ticketRef = useRef<HTMLDivElement | null>(null);
    const { state } = useLocation();
    const passengers = state?.passengers || [];

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
            formData.append("to", "vigneshfriends08@gmail.com");
            formData.append("subject", "Your Ticket");
            formData.append("body", "Here is your bus ticket.");
            formData.append("attachment", pdfBlob, "ticket.pdf");

            try {
                const response = await fetch("http://localhost:8080/send-mail-with-attachment", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    alert("Email sent successfully!");
                } else {
                    alert("Failed to send email.");
                }
            } catch (error) {
                alert("Error sending email.");
            }
        }
    };

    const from = "City X";
    const to = "City Y";
    const date = "2025-02-15";
    const ticketid = "987654";
    const pnrNo = "123987";
    const boardingPoint = "Main Bus Station";
    const busName = "Comfort Line";
    const busType = "Luxury Bus";
    const reportingTime = "8:00 AM";
    const departureTime = "8:30 AM";
    const seatNumbers = "5A, 5B";
    const departurePoint = "City Center Terminal";
    const boardingDetails = "Gate 2";

    const customerDetails = passengers.map((passenger: PassengerForTicket) => ({
        name: `${passenger.firstName} ${passenger.lastName}`,
        email: passenger.email,
        phoneNumber: passenger.phoneNumber,

    }));

    const textStyle = { color: "#343a40" };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
            <div
                className="card ticket-card shadow-lg m-4"
                ref={ticketRef}
                style={{
                    width: "850px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    height: "auto",
                }}
            >
                <div className="card-body" style={textStyle}>
                    <div className="ticket-head-content d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div>
                            {/* logo-img*/}
                        </div>
                        <div>
                            <p><b>Need help with your trip?</b></p>
                            <p>0522-2454444</p>
                            <p>care@bus.com</p>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="ticket-content d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h3 style={{ margin: "0 10px 0 0" }}>{from}</h3>
                            <img
                                src="https://img.icons8.com/?size=100&id=n2C7Bts7cbWW&format=png&color=000000"
                                alt="arrow-icon"
                                style={{ height: "20px", width: "20px", margin: "0 10px" }}
                            />
                            <h3 style={{ margin: "0 10px 0 0" }}>{to},</h3>
                            <h3 style={{ margin: "0" }}>{date}</h3>
                        </div>
                        <div>
                            <p><b>Ticket no:</b> {ticketid}</p>
                            <p><b>PNR no:</b> {pnrNo}</p>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div>
                            <b><h5>{boardingPoint}</h5></b>
                            <p>{busName} {busType}</p>
                        </div>
                        <div>
                            <b><h5>{reportingTime}</h5></b>
                            <p>Reporting time</p>
                        </div>
                        <div>
                            <b><h5>{departureTime}</h5></b>
                            <p>Departure time</p>
                        </div>
                        <div>
                            <b><h5>{seatNumbers}</h5></b>
                            <p>Seat Numbers</p>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div>
                            <b><h5>{boardingDetails}</h5></b>
                            <p>Boarding Details</p>
                        </div>
                        <div>
                            <b><h5>{boardingPoint}</h5></b>
                            <p>Boarding Point</p>
                        </div>
                        <div>
                            <b><h5>{departurePoint}</h5></b>
                            <p>Departure Point</p>
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div className="d-flex justify-content-between align-items-center" style={{ margin: "0 30px" }}>
                        <div>
                            <b><h5>Customer Info</h5></b>
                            {customerDetails.map((customer: Customer, index: number) => (
                                <div key={index}>
                                    <p><b>Name:</b> {customer.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ margin: "5px 0" }} />
                    <div style={{ marginTop: "20px" }}>
                        <h4 style={{ textAlign: "center" }}><b>Terms and Conditions</b></h4>
                        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
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
                    <div className="text-center mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={(event) => {
                                event.preventDefault();
                                generateAndSendPDF();
                            }}
                            style={{ fontSize: "16px" }}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
