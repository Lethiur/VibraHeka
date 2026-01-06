import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Core/i18n/i18n.ts';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/main.scss'
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
)
