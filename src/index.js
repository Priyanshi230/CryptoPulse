

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CryptoContex from './CryptoContex';
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.render(
  <React.StrictMode>
    <CryptoContex>
    <App/>
    </CryptoContex>
  </React.StrictMode>,
  document.getElementById('root')
);
