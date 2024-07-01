import { useCallback, useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const Carousel = ({ slides }) => {
  const [cur, setCur] = useState(0);

  const len = slides.length;

  // const leftHandle = () => {
  //   setCur(cur - 1 < 0 ? len - 1 : cur - 1);
  // };

  const rightHandle = useCallback(() => {
    setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  }, [cur, len]);

  useEffect(() => {
    const interval = setTimeout(() => {
      rightHandle();
    }, 5000);
    return () => clearTimeout(interval);
  }, [rightHandle]);

  // const handleMouseEnter = (index) => {
  //   setCur(index);
  // };

  return (
    <div className="relative min-h-full w-full">
      {slides.map((slide, index) => {
        return (
          <div
            key={index}
            className="w-full"
            // onMouseEnter={() => handleMouseEnter(index)}
          >
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
