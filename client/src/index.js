import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/home-page/home-page';
import Navigation from './navigation';
import HomePage from './pages/home-page/home-page';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <HomePage />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
