import { useCallback, useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import Button from '../Button';

const Carousel = ({ slides }) => {
  const [cur, setCur] = useState(0);

  const len = slides.length;

  const rightHandle = useCallback(() => {
    setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  }, [cur, len]);

  useEffect(() => {
    const interval = setTimeout(() => {
      rightHandle();
    }, 5000);
    return () => clearTimeout(interval);
  }, [rightHandle]);

  return (
    <div className="relative min-h-full w-full">
      {slides.map((slide, index) => {
        return (
          <div key={index} className="w-full">
            {cur === index && (
              <>
                {slide.textData ? (
                  <div className="grid w-full items-center justify-center gap-10">
                    <h5 className="m-auto">TESTIMONIAL</h5>
                    <p className="m-auto items-center text-center text-lg">
                      <strong>{slide.textData}</strong>
                    </p>

                    <div className="flex border-spacing-10 items-center justify-center gap-3 border-s-red-600">
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
                ) : (
                  <div className="flex h-full w-full select-none items-center justify-center transition-all duration-300">
                    <img
                      src={slide.img}
                      alt="img"
                      className="h-3/4 w-full object-cover"
                    />
                    <div className="absolute left-10 flex-col items-start gap-y-2 text-white lg:flex">
                      <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
                        {slide.Category}
                      </h2>
                      <h1 className="max-w-sm text-2xl font-extrabold md:text-6xl lg:text-7xl">
                        {slide.text}
                      </h1>
                      <Button
                        textColer="text-black"
                        title="SHOP NOW"
                        className="mt-4 rounded-md bg-white px-4 py-2 font-semibold hover:bg-primary hover:text-white md:px-6 md:py-2 lg:px-8 lg:py-3"
                      />
                    </div>

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
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
