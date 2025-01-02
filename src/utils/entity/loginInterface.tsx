export interface loginJwtPayload {
  FirstName?: string; 
  Role?: string;    
  [key: string]: string | number | boolean | null | undefined | Record<string, unknown> | Array<unknown>;
}

export interface SigninResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
