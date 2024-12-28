import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from '../redux/services/SignupApi';
import { TripApi } from './services/TripApi';


const store = configureStore({
  reducer:{
    [SignupApi.reducerPath]:SignupApi.reducer,
    [TripApi.reducerPath]:TripApi.reducer,
   
},
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({}).concat([SignupApi.middleware,TripApi.middleware])
})

export default store;
