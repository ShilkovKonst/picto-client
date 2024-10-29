import { useState } from "react";
import EntityItem from "./_entityItem";

const Accordion = ({ initial, entities }) => {
  const [isOpen, setIsOpen] = useState(initial);
  return (
    <>
      <div className={`grid grid-cols-${entities?.length} mb-1 gap-1 border-b`}>
        {entities?.map((entList, i) => (
          <button
            key={i}
            className={`h-10 cursor-pointer rounded-t-3xl mb-0 mt-3 mx-0 md:mx-3 lg:mx-5 xl:mx-10 border-none flex justify-center items-center ${
              isOpen != entList.name ? "bg-pbg hover:bg-pred text-white hover:text-black" : "bg-pred text-black"
            } font-bold text-sm md:text-xs lg:text-sm tracking-[1.25px] text-[#f9f9f9] outline-none capitalize transition ease-in-out duration-300`}
            onClick={() => setIsOpen(entList.name)}
          >
            {entList.name == "categories" ? "subcategories" : entList.name}
          </button>
        ))}
      </div>
      {entities?.map((entList, i) => (
        <div
          key={i}
          className={`${
            isOpen != entList.name
              ? "max-h-0 opacity-0"
              : "max-h-80 opacity-100"
          } overflow-y-scroll transition-all ease-in-out duration-150`}
        >
          <table className={`table w-full`}>
            <tbody className="flex flex-col gap-1 ">
              {entList.entity?.length > 0 &&
                entList.entity.map((el, j) => (
                  <EntityItem
                    key={j}
                    entity={el}
                    entityName={entList.name}
                    isSublist={true}
                  />
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default Accordion;
