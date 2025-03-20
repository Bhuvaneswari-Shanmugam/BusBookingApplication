import { configureStore } from '@reduxjs/toolkit';
import { TripApi } from './services/TripApi';
import { BusApi } from './services/BusApi';
import { SignupApi } from './services/SignupApi';
import { PassengerDetailsApi } from './services/PassengerDetailsApi';
import { BookingApi } from './services/BookingApi';
import { UsersApi } from './services/UserApi';
import { TicketApi } from './services/TicketApi';
import {CustomerApi} from './services/CustomerApi';
import { BookingDetailsApi } from './services/BookingDetailsApi';
import { SeatApi } from './services/SeatApi';

const store = configureStore({
  reducer: {
    [TripApi.reducerPath]: TripApi.reducer,
    [BusApi.reducerPath]: BusApi.reducer,
    [SignupApi.reducerPath]: SignupApi.reducer,
    [PassengerDetailsApi.reducerPath]: PassengerDetailsApi.reducer,
    [BookingApi.reducerPath]: BookingApi.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
    [TicketApi.reducerPath]: TicketApi.reducer,
    [CustomerApi.reducerPath]: CustomerApi.reducer,
    [BookingDetailsApi.reducerPath]: BookingDetailsApi.reducer,
    [SeatApi.reducerPath] : SeatApi.reducer,
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
