import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function MetaPixelPageView() {
    const location = useLocation();
    const firstLoad = useRef(true);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }

        if (window.fbq) {
            console.log("FB Pixel PageView", location.pathname + location.search);
            window.fbq("track", "PageView");
        }
    }, [location.pathname, location.search]);

    return null;
}