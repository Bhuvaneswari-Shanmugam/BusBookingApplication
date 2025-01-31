import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePassenger } from "../../context/PassengerProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const { passengers, email, phoneNumber } = usePassenger();

  useEffect(() => {
    // Show success message
    toast.success("Payment successful!");

    // Navigate to ticket page with a delay to show the toast message
    setTimeout(() => {
      navigate("/ticket");
    }, 3000);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", textAlign: "center" }}>
      <ToastContainer />
    
    </div>
  );
};

export default Success;
