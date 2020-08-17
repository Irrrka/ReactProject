import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Navigation';
import Auth from './Auth';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Auth >
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Auth>
  </React.StrictMode>,
  document.getElementById('root')
);

