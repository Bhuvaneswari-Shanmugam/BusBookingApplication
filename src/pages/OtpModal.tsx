import React from "react";
import Modal from "react-bootstrap/Modal";
import Input from "../components/Input";
import Button from "../components/Button";

interface OtpModalProps {
  show: boolean;
  onHide: () => void;
  OTP: string;
  setOTP: (otp: string) => void;
  handleValidateOtp: () => void;
  isLoading: boolean;
}

const OtpModal: React.FC<OtpModalProps> = ({
  show,
  onHide,
  OTP,
  setOTP,
  handleValidateOtp,
  isLoading,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered className="otp-modal">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          placeholder="OTP"
          className="form-control my-2"
          type="text"
          maxLength={6}
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button onClick={handleValidateOtp} disabled={isLoading} className="btn btn-primary w-100">
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
