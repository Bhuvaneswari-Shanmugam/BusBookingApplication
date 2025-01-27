
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
  id: number;
  name: string;
  type: string;
  departureTime: string;
  departureLocation: string;
  duration: string;
  arrivalTime: string;
  arrivalLocation: string;
  originalPrice: number;
  discountedPrice: number;
  busId: number;
  number: string;
  pickupPoint: string;
  droppingPoint: string;
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

export interface PointsSelectorProps {
  title: string;
  points: {
    id: number;
    location: string;
  }[];
  selectedPoints: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
  onApply: (selectedPoints: Set<string>) => void;
}

export interface TripDetailsModalProps {
  show: boolean;
  onClose: () => void;
  onProceed: () => void;
}


export interface PickUpPointsProps {
  onSelectionChange: (selectedPoints: Set<string>) => void;
  onApply: (selectedPoints: Set<string>) => void;
}

export interface BusCardProps {
  bus: Bus;
  from: string;
  to: string;
  date: string;
  selectedBus: Bus | null;
  selectedSeats: number[];
  bookedSeats: number[];
  viewSeats: boolean;
  rows: (number | null)[][];
  toggleSeatSelection: (seatNumber: number, e: React.MouseEvent) => void;
  handleBusClick: (bus: Bus) => void;
  handlePayment: () => void;
  handleDownloadTicket: () => void;
  totalPrice: number;
}

export interface FormData {
  pickupPoint: string;
  destinationPoint: string;
  pickupDate: string;
}