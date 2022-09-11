import React from "react";

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = React.useState({
        width: undefined,
        height: undefined,
    });

    React.useEffect(() => {
        const handleResize = () =>
            setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
};