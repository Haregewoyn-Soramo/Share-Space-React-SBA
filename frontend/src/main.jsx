import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ProductContextProvider } from './Context/ProductContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
       <ProductContextProvider>
          <App />
       </ProductContextProvider>
    </AuthContextProvider>  
  </React.StrictMode>
);
