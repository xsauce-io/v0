import { style } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import styles from './slideshow.module.css';

// ---------------- IMPORTANT -----------------
// This is only for 

const Images = [
    {
        href: "/1.svg",
    },
    {
        href: "/2.svg",
    },
    {
        href: "/3.svg",
    },
    {
        href: "/4.svg",
    },
]


export const Slideshow = ({ href }) => {
    const slides = ["#0088FE", "#00C49F", "#FFBB28"];
    const delay = 5000;

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => setIndex((prevIndex) =>
            prevIndex === (slides.length - 1) ?
                0 :
                prevIndex + 1
        ),
            delay
        );
        return () => {
            resetTimeout();
        };
    }, [index])

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }
    return (

        <div className={styles.slideshow}>
            <div
                className={styles.slideshowSlider}
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}

            >
                {Images.map((image, index) => (
                    <div
                        className={styles.slide}
                        key={index}
                    //style={{ backgroundColor }}
                    >
                        <img className="h-full object-fit" src={image.href}></img>

                    </div>
                ))}
                {/* {slides.map((backgroundColor, index) => (
                    <div
                        className={styles.slide}
                        key={index}
                        style={{ backgroundColor }}>

                    </div>
                ))} */}
            </div>
            <div className={styles.slideshowDots}>
                {Images.map((_, idx) => (

                    <div key={idx} className={index === idx ? styles.slideshowDotActive : styles.slideshowDot} onClick={() => setIndex(idx)}> </div>
                ))}

            </div>
        </div>
    )
}