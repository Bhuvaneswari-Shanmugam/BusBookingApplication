import React, { useState } from "react";
import Button from "../../components/Button";
import { colors } from "../../constants/Palette";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { useRetrievebookingByTicketIdQuery } from "../../redux/services/BookingApi";
import { useCancetTicketMutation } from "../../redux/services/BookingApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ConfirmationPopUpModal from "../../components/confirmationPopUpModal";

const CancelTicket: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
    const { data, error, isLoading, refetch } = useRetrievebookingByTicketIdQuery({ ticketId: text }, { skip: !searched });
    const [cancelTicket] = useCancetTicketMutation();

    console.log("tickets:", data);

    const handleClick = () => {
        setSearched(true);
        refetch();
    };

    const openModal = (id: string) => {
        setTicketToDelete(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setTicketToDelete(null);
        setModalIsOpen(false);
    };

    const confirmDelete = async () => {
        if (ticketToDelete) {
            try {
                await cancelTicket({ passengerId: ticketToDelete }).unwrap();
                alert("Ticket cancelled successfully!");
                refetch();
                closeModal();
            } catch (err) {
                console.error("Failed to cancel ticket:", err);
                alert("Failed to cancel ticket. Please try again.");
            }
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
                    <Card key={ticket.id} className="mt-4 "
                        description={
                            <div className="d-flex justify-content-center   ">
                                <div className="container px-4">
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
                                            <FontAwesomeIcon icon={faTrash} onClick={() => openModal(ticket.id)} style={{ cursor: 'pointer', color: '#dc3545', fontSize: '24px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                ))
            )}

            <ConfirmationPopUpModal
                show={modalIsOpen}
                onHide={closeModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to cancel this ticket?"
            />
        </div>
    );
};

export default CancelTicket;
