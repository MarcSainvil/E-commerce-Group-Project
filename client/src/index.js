import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Context provider
import { CartProvider } from './context/CartContext'; // Adjust the import path if necessary

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
