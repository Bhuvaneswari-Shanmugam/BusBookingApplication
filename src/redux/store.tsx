import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from './services/SignupApi';
import { PassengerDetailsApi } from './services/PassengerDetailsApi';

const store = configureStore({
  reducer: {
    [SignupApi.reducerPath]:SignupApi.reducer,
    [PassengerDetailsApi.reducerPath]:PassengerDetailsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(SignupApi.middleware)
      .concat(PassengerDetailsApi.middleware),
});

export default store;
