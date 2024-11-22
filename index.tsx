// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Description:
// This file serves as the main entry point of the React application.
// It imports and loads the `App` component into the DOM element with an ID of 'root'.
// The `dotenv` package is used to load environment variables from a `.env` file for configuration settings.
// React StrictMode is enabled to help detect potential issues in the application.
