export interface loginJwtPayload {
    FirstName?: string; 
    Role?: string;
    [key: string]: string | number | boolean | null | undefined | Record<string, any> | Array<any>;
  }

