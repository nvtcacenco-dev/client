import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
    const location = useLocation();
    const [key, setKey] = useState<string>('');

    useEffect(() => {
        setKey(location.pathname);
    }, [location]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [key]);

    return null;
};

export default ScrollToTop;