import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGa from 'react-ga';

const useGATracking = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            ReactGa.initialize(process.env.REACT_APP_GA_TRACKING_ID as string);
        }

        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            ReactGa.pageview(location.pathname + location.search);
        }
    }, [initialized, location]);
};

export default useGATracking;
