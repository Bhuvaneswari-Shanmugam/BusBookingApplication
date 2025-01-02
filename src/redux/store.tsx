import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from '../redux/services/SignupApi';



const store = configureStore({
  reducer:{
    [SignupApi.reducerPath]:SignupApi.reducer,

   
},
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({}).concat([SignupApi.middleware])
})

export default store;
