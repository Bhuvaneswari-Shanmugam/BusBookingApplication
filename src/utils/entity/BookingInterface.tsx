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
    bookingStatus:string;
    bookedDate:string;
    
  }
  
  export interface CreateBookingResponse {
    success: boolean;
    message: string;
    data: any;
  }

  