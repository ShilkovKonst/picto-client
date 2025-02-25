import { handleDragStart } from "@/_lib/dragNDrop";
import { textToSpeech } from "@/_lib/textToSpeech";
import Image from "next/image";
import { FaRightToBracket, FaRotate } from "react-icons/fa6";

const Dropzone = ({ phrase, setPhrase, draggedItem, setDraggedItem }) => {
  const handleClick = (i) => {
    setPhrase((prev) => {
      let prevWords = [...prev.words];
      prevWords[i] = null;
      prevWords = prevWords.filter((w) => w != null);
      prevWords.push(null);
      return {
        ...prev,
        text: prevWords
          .filter((w) => w != null)
          .map((w) => w?.pictogram?.title)
          .join(" ")
          .trim(),
        words: prevWords,
      };
    });
  };

  return (
    <div className="bg-pform flex flex-wrap justify-start xl:justify-center px-8 py-2 mb-3 gap-2 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
      {phrase?.words?.map((slide, i) => (
        <div
          key={i}
          id={`place-${i}`}
          className={`relative dropzone flex justify-center items-center overflow-hidden h-[4.25rem] w-[4.25rem] md:h-[5.25rem] md:w-[5.25rem] lg:h-[6.25rem] lg:w-[6.25rem] xl:mx-5 rounded-xl border-2 ${
            draggedItem ? "border-secondary" : "border-primary"
          } `}
        >
          {slide?.pictogram ? (
            <>
              <Image
                {...(handleDragStart && {
                  onMouseDown: (e) =>
                    handleDragStart(e, slide, setDraggedItem, phrase, setPhrase),
                  onTouchStart: (e) =>
                    handleDragStart(e, slide, setDraggedItem, setPhrase),
                })}
                className="cursor-pointer"
                onClick={() => textToSpeech(slide?.pictogram?.title)}
                src={`data:${slide?.pictogram?.media?.imageFileRes?.type};base64,${slide?.pictogram?.media?.imageFileRes?.imageBase64}`}
                alt={slide?.pictogram?.media?.imageName}
                width={96}
                height={96}
              />
              <button
                onClick={() => handleClick(i)}
                className="absolute h-6 w-6 right-0 top-0 font-bold rounded-bl-xl border-l-2 border-b-2 border-primary hover:bg-secondary bg-white"
              >
                X
              </button>
              {draggedItem && (
                <div className="absolute h-[4.125rem] w-[4.125rem] md:h-[5.125rem] md:w-[5.125rem] lg:h-[6.125rem] lg:w-[6.125rem] right-0 top-0 flex items-center justify-center font-bold rounded-bl-xl border-l-2 border-b-2 text-secondary bg-white opacity-65">
                  <FaRotate size={50} />
                </div>
              )}
            </>
          ) : (
            <div
              className={`flex items-center justify-center w-full h-full font-bold ${
                draggedItem ? "text-secondary" : "text-primary"
              } rotate-90`}
            >
              <FaRightToBracket size={50} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropzone;
