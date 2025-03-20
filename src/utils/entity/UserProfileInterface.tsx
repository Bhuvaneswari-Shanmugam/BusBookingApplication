


export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    age: number;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    address: string;
}
type Gender = 'male' | 'female' | 'other';

export interface CustomJwtPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
    phoneNumber: string;
    address: string;
    role: string;
}
export interface ProfileProps {
    userId : string;
}