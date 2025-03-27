export interface CreateBookingRequest {
  pickupPoint: string;
  destinationPoint: string;
  pickupTime: string;
  busNumber: number;
  busType: string;
  bookedSeats: number[];
  perSeatAmount: number;
  totalAmount: number;
  ticketId:string;
  pickupStop:string;
  droppingStop:string;
  userEmail:string;
  
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: any;
}
export interface CreateBookingResponse {
  id: string; 
}

export interface ConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    message: string;
}