import { getAccessRole } from "./getAccessRole";
import { ROUTE } from "../constants/APP_VARIABLE";
import MissMatch from "../pages/MissMatch";


const RouteAccess = () => {
const getAccess=getAccessRole();


switch (getAccess.getdata) {
case 'ROLE_ADMIN':
      return [
        {path:ROUTE.BOOKING_DETAILS }
      ];
    case 'ROLE_CUSTOMER':
      return [];
    default:
      return [
        { path: ROUTE.MISSMATCH, element:<MissMatch/>},
        
      ];
  }
};
export default RouteAccess;
