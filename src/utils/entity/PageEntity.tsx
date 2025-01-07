
export interface AccessRole {
    getdata: string | number;
    exp?: number;
}

export interface DecodedToken {
    sub: string;
    UserEmail: string;
    iat: number;
    exp: number;
    FirstName: string;
    UserId: string;
    Role: string;
}

export interface Bus {
    name: string;
    type: string;
    departureTime: string;
    departureLocation: string;
    duration: string;
    arrivalTime: string;
    arrivalLocation: string;
    rating: string;
    originalPrice: number;
    discountedPrice: number;
    busId: number;
  }

export interface BookingDetails {
    pickupPoint: string;
    destinationPoint: string;
    pickupTime: string;
    busNumber: number;
    busType: string;
    bookedNoOfSeats: number[];
    perSeatAmount: number;
    totalAmount: number;
  }
  
