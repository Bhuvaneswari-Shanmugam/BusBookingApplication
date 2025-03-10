import { configureStore } from '@reduxjs/toolkit';
import { TripApi } from './services/TripApi';
import { BusApi } from './services/BusApi';
import { SignupApi } from './services/SignupApi';
import { PassengerDetailsApi } from './services/PassengerDetailsApi';
import { BookingApi } from './services/BookingApi';
import { UsersApi } from './services/UserApi';
import { TicketApi } from './services/TicketApi';

const store = configureStore({
  reducer: {
    [TripApi.reducerPath]: TripApi.reducer,
    [BusApi.reducerPath]: BusApi.reducer,
    [SignupApi.reducerPath]: SignupApi.reducer,
    [PassengerDetailsApi.reducerPath]: PassengerDetailsApi.reducer,
    [BookingApi.reducerPath]: BookingApi.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
    [TicketApi.reducerPath] : TicketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      TripApi.middleware,
      BusApi.middleware,
      SignupApi.middleware,
      PassengerDetailsApi.middleware,
      BookingApi.middleware,
      UsersApi.middleware,
      TicketApi.middleware,
    ),
});

export default store;
