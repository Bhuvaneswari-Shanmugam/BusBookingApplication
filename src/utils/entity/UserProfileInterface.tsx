
export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    age: number;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    address: string;
}