import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Navigation';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

