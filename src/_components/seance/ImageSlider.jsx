"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Slider from "react-slick";

const ImageSlider = ({
  slides,
  handleClick,
  setState,
  handleDragStart,
  setDraggedItem,
  setDropZones,
  cursorClass,
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
            setState={setState}
            handleDragStart={handleDragStart}
            setDraggedItem={setDraggedItem}
            setDropZones={setDropZones}
            handleClick={handleClick}
          />
        ))}
      </Slider>
    </div>
  );
};
export default ImageSlider;

const CustomSlide = ({
  slide,
  setState,
  handleDragStart,
  setDraggedItem,
  setDropZones,
  handleClick,
  cursorClass,
}) => {
  return (
    <div className="pb-6">
      <button
        onClick={() => handleClick(slide, setState)}
        className={`flex justify-center items-center overflow-hidden h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mx-auto rounded-xl border-2 border-primary`}
      >
        <Image
          {...(handleDragStart && {
            onMouseDown: (e) =>
              handleDragStart(e, slide, setDraggedItem, setDropZones),
            onTouchStart: (e) =>
              handleDragStart(e, slide, setDraggedItem, setDropZones),
          })}
          className={cursorClass}
          src={`data:${slide?.media?.imageFileRes.type};base64,${slide?.media?.imageFileRes.imageBase64}`}
          alt={slide?.media?.imageName}
          width={96}
          height={96}
        />
      </button>
    </div>
  );
};
