"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Slider from "react-slick/lib/slider";

const ImageSlider = ({ slides, handleClick, setState }) => {
  const settings = {
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: slides.length < 10 ? slides.length : 10,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slides.length < 4 ? slides.length : 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slides.length < 6 ? slides.length : 6,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: slides.length < 8 ? slides.length : 8,
        },
      },
    ],
  };

  return (
    <div className="slider-container px-8">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div className="" key={i}>
            <button
              onClick={() => handleClick(slide, setState)}
              className={`flex justify-center items-center h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mx-auto rounded-lg`}
            >
              <Image
                src={`data:${slide?.media?.imageFileRes.type};base64,${slide?.media?.imageFileRes.imageBase64}`}
                alt={slide?.media?.imageName}
                width={96}
                height={96}
              />
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
