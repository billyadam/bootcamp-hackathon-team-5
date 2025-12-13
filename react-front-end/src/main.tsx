import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletKitProvider } from '@mysten/wallet-kit';
import './styles/globals.css';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <WalletKitProvider>
      <App />
    </WalletKitProvider>
  </React.StrictMode>
);