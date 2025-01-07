import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from '../redux/services/SignupApi';
import { TripApi } from './services/TripApi';
import {BusApi} from '../redux/services/BusApi';

const store = configureStore({
  reducer: {
    [SignupApi.reducerPath]: SignupApi.reducer,
    [TripApi.reducerPath]: TripApi.reducer,
    [BusApi.reducerPath]:BusApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(SignupApi.middleware)
      .concat(TripApi.middleware)
      .concat(BusApi.middleware),
});

export default store;
