"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomSlide from "./CustomSlide";

const ImageSlider = ({
  cursorClass,
  slides,
  phrase,
  setPhrase,
  setDraggedItem,
  handleClick,
  setState,
  selectedItem,
  slideType,
}) => {
  const settings = {
    className: "h-20 md:h-24 lg:h-28",
    infinite: false,
    speed: 500,
    slidesToShow: slides.length < 10 ? slides.length : 10,
    slidesToScroll: slides.length < 10 ? slides.length - 1 : 9,
    swipeToSlide: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 530,
        settings: {
          slidesToShow: slides.length < 3 ? slides.length : 3,
          slidesToScroll: slides.length < 3 ? slides.length - 1 : 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slides.length < 4 ? slides.length : 4,
          slidesToScroll: slides.length < 4 ? slides.length - 1 : 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slides.length < 6 ? slides.length : 6,
          slidesToScroll: slides.length < 6 ? slides.length - 1 : 5,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: slides.length < 8 ? slides.length : 8,
          slidesToScroll: slides.length < 8 ? slides.length - 1 : 7,
        },
      },
    ],
  };

  return (
    <div className={`slider-container bg-transparent px-8 py-2 mb-3 rounded-2xl `}>
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <CustomSlide
            key={i}
            cursorClass={cursorClass}
            slide={slide}
            setDraggedItem={setDraggedItem}
            phrase={phrase}
            setPhrase={setPhrase}
            handleClick={handleClick}
            setState={setState}
            selectedItem={selectedItem}
            slideType={slideType}
          />
        ))}
      </Slider>
    </div>
  );
};
export default ImageSlider;
