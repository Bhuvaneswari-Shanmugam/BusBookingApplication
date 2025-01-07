import { configureStore } from '@reduxjs/toolkit';
import { TripApi } from './services/TripApi';
import {BusApi} from '../redux/services/BusApi';

const store = configureStore({
  reducer: {
    [TripApi.reducerPath]: TripApi.reducer,
    [BusApi.reducerPath]:BusApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(TripApi.middleware)
      .concat(BusApi.middleware),
});

export default store;
