import { textToSpeech } from "@/_lib/textToSpeech";
import Image from "next/image";

const CustomSlide = ({
  slide,
  handleDragStart,
  setDraggedItem,
  setDropZones,
  cursorClass,
}) => {
  return (
    <div className="pb-6">
      <button
        onClick={() => textToSpeech(slide.title)}
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

export default CustomSlide;
