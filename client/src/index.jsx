import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/root.scss';
import './assets/css/index.scss';
import "easymde/dist/easymde.min.css";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

