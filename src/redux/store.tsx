import { configureStore } from '@reduxjs/toolkit';
import { TripApi } from './services/TripApi';
import {BusApi} from '../redux/services/BusApi';
import { SignupApi } from './services/SignupApi';
import { PassengerDetailsApi } from './services/PassengerDetailsApi';

const store = configureStore({
  reducer: {
    [TripApi.reducerPath]: TripApi.reducer,
    [BusApi.reducerPath]:BusApi.reducer,
    [SignupApi.reducerPath]:SignupApi.reducer,
    [PassengerDetailsApi.reducerPath]:PassengerDetailsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(TripApi.middleware)
      .concat(BusApi.middleware)
      .concat(SignupApi.middleware)
      .concat(PassengerDetailsApi.middleware),
});
export default store;
