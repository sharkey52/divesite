import React, { useState, useEffect } from 'react';
import '../styles/componentstyles/ImageSlider.css';

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const images = Array.from({length: 10}, (_, index) => `dummy_image_${index + 1}`); // replace dummy images with real ones

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000); // 5 seconds interval
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="imageSlider">
            <img src={images[current]} alt="slideshow" />
        </div>
    );
};

export default ImageSlider;

