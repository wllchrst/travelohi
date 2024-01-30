import React, { useState } from 'react';
import "../../styles/carouse.scss"
import useFetchPromos from '../../hooks/use-fetch-promos';
import Loading from '../wrapper/loading';
import { HotelImageDiv } from '../wrapper/DivForImage';
import { SubTitle } from '../wrapper/subtitle';
import { Title } from '../wrapper/title';
import { Shadowed } from '../wrapper/container';
import { PrimaryBackground, SecondaryColor } from '../wrapper/secondary';
const Carousel = () => {
    const { promos, isLoading } = useFetchPromos()
    const slides = promos
    const [currentIndex, setCurrentIndex] = useState(0);

    if(isLoading) return <Loading></Loading>

    const nextSlide = () => {
        console.log(slides.length);
        setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : 0));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slides.length - 1));
    };

    return (
        <div className="carousel-container">
        <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slides.map((slide, index) => (
            <div key={index} className="carousel-slide center">
                <div className="image-container p-1">
                    <HotelImageDiv>
                        <img src={slide.PictureLink}></img>
                    </HotelImageDiv>
                </div>
            </div>
            ))}
        </div>
        <button className="hover-effects border-radius-50per prev-btn w-2 h-2 center" onClick={prevSlide}><SubTitle>&#8249;</SubTitle></button>
        <button className="hover-effects border-radius-50per next-btn w-2 h-2 center" onClick={nextSlide}>
            <SubTitle>&#8250;</SubTitle>
        </button>
        </div>
    );
};

export default Carousel;
