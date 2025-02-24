import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from '../src/redux/store';
import { BookingProvider } from './context/BookingProvider';
import { PassengerProvider } from './context/PassengerProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BookingProvider>
        <PassengerProvider>
          <App />
        </PassengerProvider>
      </BookingProvider>
    </Provider>
  </React.StrictMode>
);
