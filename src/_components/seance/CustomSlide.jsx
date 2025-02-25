import { handleDragStart } from "@/_lib/dragNDrop";
import { textToSpeech } from "@/_lib/textToSpeech";
import Image from "next/image";

const CustomSlide = ({
  slide,
  setDraggedItem,
  phrase,
  setPhrase,
  cursorClass,
}) => {
  return (
    <div className="pb-6">
      <button
        onClick={() => textToSpeech(slide.title)}
        className={`flex justify-center items-center overflow-hidden h-[4.25rem] w-[4.25rem] md:h-[5.25rem] md:w-[5.25rem] lg:h-[6.25rem] lg:w-[6.25rem] mx-auto rounded-xl border-2 border-primary`}
      >
        <Image
          {...(handleDragStart && {
            onMouseDown: (e) =>
              handleDragStart(e, slide, setDraggedItem, phrase, setPhrase),
            onTouchStart: (e) =>
              handleDragStart(e, slide, setDraggedItem, phrase, setPhrase),
          })}
          className={`${cursorClass} h-[4rem] w-[4rem] md:h-[5rem] md:w-[5rem] lg:h-[6rem] lg:w-[6rem]`}
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
