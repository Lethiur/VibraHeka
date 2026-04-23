import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search,
            title: location.pathname.split('/')[1]
        });
        console.log("Page view tracked:",  location.pathname.split('/')[1]);
    }, [location]);

    return null;
}