import Image from "next/image";

const Dropzone = ({ dropZones, setDropZones, draggedItem }) => {
  const handleClick = (e, i) => {
    setDropZones((prev) => {
      const newDropZones = [...prev];
      newDropZones[i] = null;
      return newDropZones;
    });
  };

  return (
    <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
      {dropZones.map((slide, i) => (
        <div
          key={i}
          id={`place-${i}`}
          className={`dropzone flex justify-center items-center overflow-hidden h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:mx-auto rounded-xl border-2 ${draggedItem && !slide ? "border-secondary" : "border-primary"} `}
        >
          {slide ? (
            <Image
              className="cursor-pointer"
              onClick={(e) => handleClick(e, i)}
              src={`data:${slide?.media?.imageFileRes.type};base64,${slide?.media?.imageFileRes.imageBase64}`}
              alt={slide?.media?.imageName}
              width={96}
              height={96}
            />
          ) : (
            i
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropzone;
