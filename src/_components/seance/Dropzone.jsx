import { textToSpeech } from "@/_lib/textToSpeech";
import Image from "next/image";

const Dropzone = ({ dropZones, setDropZones, setPhrase, draggedItem }) => {
  const handleClick = (e, i, slide) => {
    setDropZones((prev) => {
      const newDropZones = [...prev];
      newDropZones[i] = null;
      return newDropZones;
    });
    setPhrase((prev) => {
      const newWords = [...prev.words];
      newWords[i] = null;
      return {
        ...prev,
        text: newWords
          .filter((w) => w != null)
          .map((w) => w?.pictogram?.title)
          .join(" ")
          .trim(),
        words: newWords,
      };
    });
  };

  return (
    <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-2 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
      {dropZones.map((slide, i) => (
        <div
          key={i}
          id={`place-${i}`}
          className={`relative dropzone flex justify-center items-center overflow-hidden h-[4.125rem] w-[4.125rem] md:h-[5.125rem] md:w-[5.125rem] lg:h-[6.125rem] lg:w-[6.125rem] xl:mx-auto rounded-xl border-2 ${
            draggedItem ? "border-secondary" : "border-primary"
          } `}
        >
          {slide ? (
            <>
              <Image
                className="cursor-pointer"
                onClick={() => textToSpeech(slide.title)}
                src={`data:${slide?.media?.imageFileRes.type};base64,${slide?.media?.imageFileRes.imageBase64}`}
                alt={slide?.media?.imageName}
                width={96}
                height={96}
              />
              <button
                onClick={(e) => handleClick(e, i)}
                className="absolute h-6 w-6 right-0 top-0 font-bold rounded-bl-xl border-l-2 border-b-2 border-primary hover:bg-secondary bg-white"
              >
                X
              </button>
            </>
          ) : (
            i
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropzone;
