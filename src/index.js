import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContext, AuthContextProvider } from './components/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
   </React.StrictMode>
  </AuthContextProvider>
);

