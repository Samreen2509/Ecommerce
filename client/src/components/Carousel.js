'use client';
import { useCallback, useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import img1 from '../../images/banner-home1-1-min_2048x.webp';
import img2 from '../../images/banner-home1-2-min-min_2048x.webp';
import img3 from '../../images/s-1-3_2048x.webp';

const Carousel = () => {
  const slides = [
    { img: img1, Category: 'New Arrival', text: 'WOMEN DRESS', href: '#' },
    { img: img2, Category: 'New Arrival', text: 'AUTOMAN OVER ', href: '#' },
    { img: img3, Category: 'New Arrival', text: 'WOMEN GLASSER', href: '#' },
  ];
  const [cur, setCur] = useState(0);

  const len = slides.length;

  const leftHandle = () => {
    setCur(cur - 1 < 0 ? len - 1 : cur - 1);
  };

  const rightHandle = useCallback(() => {
    setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  }, [cur, len]);

  useEffect(() => {
    const interval = setTimeout(() => {
      rightHandle();
    }, 3000);
    return () => clearTimeout(interval);
  }, [rightHandle]);

  const handleMouseEnter = (index) => {
    console.log(index);
    setCur(index);
  };

  return (
    <div className="relative min-h-full w-full">
      {slides.map((slide, index) => {
        return (
          <div
            key={index}
            className="w-full"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {cur === index && (
              <div className="flex h-full w-full select-none items-center justify-center bg-orange-400 transition-all duration-300">
                <img
                  src={slide.img}
                  alt="img"
                  className="object-cover"
                  loading="true"
                />
                <div className="absolute left-10 top-1/2 hidden -translate-y-1/2 flex-col items-start gap-y-2 text-white  lg:flex ">
                  <h2 className="text-3xl font-bold lg:text-xl">
                    {slide.Category}
                  </h2>
                  <h1 className="max-w-sm font-extrabold lg:text-7xl">
                    {slide.text}
                  </h1>
                  <button className="mt-4 rounded-sm bg-white px-8 py-3 font-semibold text-black hover:bg-black hover:text-white">
                    SHOP NOW
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="absolute right-5 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3">
        {slides.map((_, index) => (
          <FaCircle
            key={index}
            onClick={() => setCur(index)}
            size={10}
            color={cur === index ? 'white' : 'gray'}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
