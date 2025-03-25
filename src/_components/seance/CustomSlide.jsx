import { handleDragStart } from "@/_lib/dragNDrop";
import { textToSpeech } from "@/_lib/textToSpeech";
import Image from "next/image";

const CustomSlide = ({
  slide,
  setDraggedItem,
  phrase,
  setPhrase,
  cursorClass,
  handleClick,
  setState,
  selectedItem,
  slideType,
}) => {
  return (
    <div className="">
      <button
        {...(handleClick && { onClick: () => textToSpeech(slide.title) })}
        className={`group flex justify-center items-center overflow-hidden mx-auto rounded-xl ${
          slideType == "category"
            ? selectedItem?.id != slide?.id
              ? "border-primary border-2 h-[4.25rem] w-[4.25rem] md:h-[5.25rem] md:w-[5.25rem] lg:h-[6.25rem] lg:w-[6.25rem]"
              : "border-secondary border-4 h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem] lg:h-[7rem] lg:w-[7rem]"
            : "border-pform border-2 "
        } transition-all duration-100 ease-in-out ${
          slideType == "category"
            ? selectedItem?.id != slide?.id &&
              "hover:h-[5rem] hover:w-[5rem] hover:md:h-[6rem] hover:md:w-[6rem] hover:lg:h-[7rem] hover:lg:w-[7rem]"
            : "hover:border-secondary border-2"
        } `}
      >
        <Image
          {...(!handleClick
            ? {
                onMouseDown: (e) =>
                  handleDragStart(e, slide, setDraggedItem, phrase, setPhrase),
                onTouchStart: (e) =>
                  handleDragStart(e, slide, setDraggedItem, phrase, setPhrase),
              }
            : {
                onClick: () => handleClick(slide, setState, selectedItem),
              })}
          className={`${cursorClass} transition-all duration-100 ease-in-out h-[4rem] w-[4rem] md:h-[5rem] md:w-[5rem] lg:h-[6rem] lg:w-[6rem] ${
            slideType == "category" && (selectedItem?.id != slide?.id
              ? "group-hover:h-[4.75rem] group-hover:w-[4.75rem] group-hover:md:h-[5.75rem] group-hover:md:w-[5.75rem] group-hover:lg:h-[6.75rem] group-hover:lg:w-[6.75rem]"
              : "h-[4.5rem] w-[4.5rem] md:h-[5.5rem] md:w-[5.5rem] lg:h-[6.5rem] lg:w-[6.5rem]")
          }`}
          src={`data:${slide?.media?.imageFileRes.type};base64,${slide?.media?.imageFileRes.imageBase64}`}
          alt={slide?.media?.imageName}
          width={112}
          height={112}
        />
      </button>
    </div>
  );
};

export default CustomSlide;
