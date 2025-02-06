"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomSlide from "./CustomSlide";

const ImageSlider = ({
  cursorClass,
  slides,
  setPhrase,
  setDraggedItem,
  setDropZones,
}) => {
  const settings = {
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: slides.length < 10 ? slides.length : 10,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
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
        breakpoint: 1250,
        settings: {
          slidesToShow: slides.length < 8 ? slides.length : 8,
        },
      },
    ],
  };

  return (
    <div className="slider-container bg-pform px-8 pt-2 mb-3 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <CustomSlide
            key={i}
            cursorClass={cursorClass}
            slide={slide}
            setDraggedItem={setDraggedItem}
            setDropZones={setDropZones}
            setPhrase={setPhrase}
          />
        ))}
      </Slider>
    </div>
  );
};
export default ImageSlider;
