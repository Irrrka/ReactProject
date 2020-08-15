import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import styles from './index.module.css';
import App from './App';
import Navigation from './navigation';

ReactDOM.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
      <App>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </App>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
  document.getElementById('root')
);
