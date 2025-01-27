export interface LoginJwtPayload {
  FirstName?: string;
  Role?: string; 
  [key: string]: string | number | boolean | null | undefined | Record<string, string | number | boolean | null | undefined> | Array<string | number | boolean | null>;
}

export interface SigninResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
