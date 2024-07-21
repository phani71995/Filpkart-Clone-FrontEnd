// src/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const images = [
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/9384b37a848c5e60.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/18c34ac79f6b71ce.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/1ff44be91eab2e44.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/354cde8026deab5a.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/1e513363d2412d0a.jpg?q=20'
];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index}>
                        <img src={src} alt={`Slide ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;

