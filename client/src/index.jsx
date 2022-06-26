import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/root.scss';
import './assets/css/index.scss';
import "easymde/dist/easymde.min.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

