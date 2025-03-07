import { getAccessRole } from "./getAccessRole";
import { ROUTE } from "../constants/APP_VARIABLE";
import MissMatch from "../pages/MissMatch";
import AvailableBuses from "../pages/booking/AvailableBuses";
import Home from "../pages/Home";


const RouteAccess = () => {
const getAccess=getAccessRole();


switch (getAccess.getdata) {
case 'ROLE_ADMIN':
      return [
        {path:ROUTE.BOOKING_DETAILS }
       
      ];
    case 'ROLE_CUSTOMER':
      return [
        {path:ROUTE.BUSES, element:<AvailableBuses />},
        {path:ROUTE.HOME,element:<Home />}
        
      ];
    default:
      return [
        { path: ROUTE.MISSMATCH, element:<MissMatch/>},

        
      ];
  }
};
export default RouteAccess;
