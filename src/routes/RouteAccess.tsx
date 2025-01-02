import React from "react";
import { getAccessRole } from "./getAccessRole";


const RouteAccess = () => {
const getAccess=getAccessRole();


switch (getAccess.getdata) {
case 'ROLE_ADMIN':
      return [
        {
          
        }
      ];
    case 'ROLE_CUSTOMER':
      return [];
    default:
      return [
        { path: '*', element: <h1>go to home page</h1> },
      ];
  }
};
export default RouteAccess;
