import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//context provider
import { CartProvider } from '../src/context/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>

    <App />
    
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
