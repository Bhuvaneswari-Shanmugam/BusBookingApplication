import React, { useEffect, useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa";

type TicketDTO = {
  date: string;
  fileName: string;
  amount: number;
  url: string;
  customerName: string;
};

const ShowTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8082/ticket/retrieve/aws-pdf?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTickets(data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Show Tickets</h2>
      <div className="row">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{ticket.fileName}</h5>
                    <p className="card-text">
                      <strong>Customer:</strong> {ticket.customerName}
                    </p>
                    <p className="card-text">
                      <strong>Amount:</strong> ₹{ticket.amount}
                    </p>
                    <p className="card-text">
                      <strong>Date:</strong> {formatDate(ticket.date)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a
                      href={ticket.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary mt-3"
                    >
                      <FaEye className="me-2" />
                      View
                    </a>
                    <a
                      href={`/download/${ticket.fileName}`}
                      download={ticket.fileName}
                      className="btn btn-primary mt-3"
                    >
                      <FaDownload className="me-2" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default ShowTickets;
