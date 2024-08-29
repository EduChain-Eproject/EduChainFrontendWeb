import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const images = [
    "https://i.pinimg.com/564x/f9/23/a5/f923a50a96b2830ebaff3d0848b5116c.jpg",
    "https://i.pinimg.com/564x/5c/d8/f1/5cd8f13571ab89f36137ef080ee952a1.jpg",
    "https://i.pinimg.com/564x/49/09/d1/4909d10f016438c4773a613f38fb4055.jpg"
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              src={src}
              alt={`Background ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 p-6">
        {children}
      </div>
    </div>
  );
};

export default CarouselBackground;
