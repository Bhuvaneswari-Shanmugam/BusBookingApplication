import { configureStore } from '@reduxjs/toolkit';
import { TripApi } from './services/TripApi';
import {BusApi} from '../redux/services/BusApi';
import { SignupApi } from './services/SignupApi';
import { PassengerDetailsApi } from './services/PassengerDetailsApi';
import { UsersApi } from './services/UserApi';
import { SeatApi } from './services/SeatApi';
import { CustomerApi } from './services/CustomerApi';
import { BookingDetailsApi } from './services/BookingDetailApi';
import { TicketApi } from './services/TicketApi';
import { BookingApi } from './services/BookingApi';

const store = configureStore({
  reducer: {
    [TripApi.reducerPath]: TripApi.reducer,
    [BusApi.reducerPath]:BusApi.reducer,
    [SignupApi.reducerPath]:SignupApi.reducer,
    [PassengerDetailsApi.reducerPath]:PassengerDetailsApi.reducer,
    [UsersApi.reducerPath]:UsersApi.reducer,
    [SeatApi.reducerPath]:SeatApi.reducer,
    [CustomerApi.reducerPath]:CustomerApi.reducer,
    [BookingDetailsApi.reducerPath]:BookingDetailsApi.reducer,
    [TicketApi.reducerPath]:TicketApi.reducer,
    [BookingApi.reducerPath]:BookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(TripApi.middleware)
      .concat(BusApi.middleware)
      .concat(SignupApi.middleware)
      .concat(PassengerDetailsApi.middleware)
      .concat(UsersApi.middleware)
      .concat(SeatApi.middleware)
      .concat(CustomerApi.middleware)
      .concat(BookingDetailsApi.middleware)
      .concat(TicketApi.middleware)
      .concat(BookingApi.middleware)
});
export default store;
