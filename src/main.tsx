import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@core/i18n/i18n.ts';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/main.scss'
import { BrowserRouter as Router } from "react-router-dom";
import ToastProvider from '@core/Presentation/Components/organisms/Toast/ToastProvider.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <ToastProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ToastProvider>
        </Router>
    </React.StrictMode>,
)
