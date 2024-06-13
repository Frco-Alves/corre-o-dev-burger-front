import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';
import Routes from './routes/routes';
import GlobalStyles from './styles/globalStyles';
import UserProvider from './hooks/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserProvider>
      <Routes />
    </UserProvider>
    <ToastContainer autoClose={2000} theme='dark' />
    <GlobalStyles />
  </>,
)
  



