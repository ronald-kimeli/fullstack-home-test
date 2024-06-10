import { useState, useEffect } from 'react';

export const useScreenSize = (): number => {
    const [screenSize, setScreenSize] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setScreenSize(1);
            } else if (width < 960) {
                setScreenSize(2);
            } else if (width < 1280) {
                setScreenSize(3);
            } else if (width < 1920) {
                setScreenSize(4);
            } else {
                setScreenSize(6);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
};
