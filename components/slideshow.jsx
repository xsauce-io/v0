import { style } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import styles from './slideshow.module.css';

// ---------------- IMPORTANT -----------------
// This component can only be used in jsx files.
// And its currently hardcoded to support the onboarding modal

const Images = [
    {
        href: "/hand.png",
        header:"Welcome to the Xchange",
        text: "Culture is now in your hands. Before you get started, we need to explain a few things."
        
    },
    {
        href: "/basics.png",
    },
    {
        href: "/magglass.png",
    },
    {
        href: "/money.png",
    },
]


export const Slideshow = () => {
    //const slides = ["#0088FE", "#00C49F", "#FFBB28"];
    const delay = 7000;

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => setIndex((prevIndex) =>
            prevIndex === (Images.length - 1) ?
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
                        <img className="object-fit" src={image.href}></img>
                        <h1 className='text-white text-xl'>{image.header}</h1>
                        <p className="text-white font-SG">{image.text}</p>
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