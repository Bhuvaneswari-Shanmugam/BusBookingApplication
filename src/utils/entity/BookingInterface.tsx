export interface CreateBookingRequest {
    pickupPoint: string;
    destinationPoint: string;
    pickupTime: string;
    busNumber: number;
    busType: string;
    bookedNoOfSeats: number[];
    perSeatAmount: number;
    totalAmount: number;
    
  }
  
  export interface CreateBookingResponse {
    success: boolean;
    message: string;
    data: any;
  }