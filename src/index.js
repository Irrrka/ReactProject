import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Navigation';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
     <ErrorBoundary>
    <App>
      <Navigation />
    </App>
     </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

