
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
