import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@core/i18n/i18n.ts';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Assets/Styles/main.scss'
import { BrowserRouter as Router } from "react-router-dom";
import ToastProvider from '@core/Presentation/Components/organisms/Toast/ToastProvider.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactGA from "react-ga4";
import AnalyticsTracker from "@/GATracker.tsx";

const queryClient = new QueryClient();
const PRELOAD_RETRY_KEY = 'vh:preload-retry';

window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();

    if (sessionStorage.getItem(PRELOAD_RETRY_KEY) === '1') {
        console.error('Preload error persists after one reload. Skipping further automatic reloads.');
        return;
    }

    sessionStorage.setItem(PRELOAD_RETRY_KEY, '1');

    const url = new URL(window.location.href);
    url.searchParams.set('v', Date.now().toString());
    window.location.replace(url.toString());
});

ReactGA.initialize(import.meta.env.VITE_GA_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <AnalyticsTracker />
            <ToastProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ToastProvider>
        </Router>
    </React.StrictMode>,
)
