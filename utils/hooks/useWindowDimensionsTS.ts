import React, { useState, useEffect } from 'react';

export const useWindowDimensions =  () => {
interface screen {
  width: number | undefined;
  height: number | undefined;
}
 
 const [windowDimensions, setWindowDimensions] = useState<screen | undefined>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => setWindowDimensions({width: window.innerWidth, height: window.innerHeight});

         window.addEventListener('resize', handleResize);

         handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])





    return windowDimensions
};