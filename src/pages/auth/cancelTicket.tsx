import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { colors } from "../../constants/Palette";
import Card from "../../components/Card";
import { useRetrievebookingByTicketIdQuery } from "../../redux/services/BookingApi";
import { useCancetTicketMutation } from "../../redux/services/BookingApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CancelTicket: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);
    const { data, error, isLoading, refetch } = useRetrievebookingByTicketIdQuery({ ticketId: text }, { skip: !searched });
    const [cancelTicket] = useCancetTicketMutation();

    console.log("tickets:", data);

    const handleClick = () => {
        setSearched(true);
        refetch();
    };

    const handleDelete = async (id: string) => {
        try {
            await cancelTicket({ passengerId: id }).unwrap();
            alert("Ticket cancelled successfully!");
            refetch();
        } catch (err) {
            console.error("Failed to cancel ticket:", err);
            alert("Failed to cancel ticket. Please try again.");
        }
    };

    return (
        <div className="d-flex flex-column mt-5" style={{ height: '90vh', width: '900px' }}>
            <div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div style={{ textAlign: "center" }}>
                        <Input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter Ticket ID"
                            style={{ width: '300px', height: '50px', padding: "10px", fontSize: "16px", borderRadius: '7px' }}
                        />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <Button
                            onClick={handleClick}
                            style={{ width: '150px', height: '50px', padding: "10px 15px", borderRadius: "7px", border: 'none', color: 'white', backgroundColor: colors.pagecolor }}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error loading booking details</p>}
            </div>

            {data && searched && data.data.length > 0 && (
                data.data.map((ticket: any) => (
                    <Card key={ticket.id} className="mt-4"
                        description={
                            <div className="d-flex justify-content-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col"><strong>Name</strong></div>
                                        <div className="col"><strong>Age</strong></div>
                                        <div className="col"><strong>Gender</strong></div>
                                        <div className="col"><strong>Bus Number</strong></div>
                                        <div className="col"><strong>Seat Number</strong></div>
                                        <div className="col"><strong>Pickup Point</strong></div>
                                        <div className="col"><strong>Dropping Point</strong></div>
                                        <div className="col"><strong>Trip Date</strong></div>
                                        <div className="col"><strong>Cancel Ticket</strong></div>
                                    </div>
                                    <div className="row">
                                        <div className="col">{ticket.name}</div>
                                        <div className="col">{ticket.age}</div>
                                        <div className="col">{ticket.gender}</div>
                                        <div className="col">{ticket["bus number"]}</div>
                                        <div className="col">{ticket["seat number"]}</div>
                                        <div className="col">{ticket["pickup point"]}</div>
                                        <div className="col">{ticket["dropping point"]}</div>
                                        <div className="col">{new Date(ticket["pickup Time"]).toLocaleString()}</div>
                                        <div className="col text-right">
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(ticket.id)} style={{ cursor: 'pointer', color: '#dc3545', fontSize: '24px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                ))
            )}
        </div>
    );
};

export default CancelTicket;
