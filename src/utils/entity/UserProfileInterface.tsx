
export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    age: number;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    address: string;
}


export interface ConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    message: string;
    
    }