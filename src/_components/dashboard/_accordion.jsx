import { useState } from "react";
import EntityItem from "./_entityItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreateIcon } from "../icons";

const Accordion = ({ initial, entities, session, patient }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(initial);

  return (
    <>
      <div className={`grid grid-cols-${entities?.length} gap-1 border-b`}>
        {entities?.map((entList, i) => (
          <button
            key={i}
            className={`h-10 cursor-pointer rounded-t-3xl mb-0 mt-3 mx-0 md:mx-3 lg:mx-5 xl:mx-10 border-none flex justify-center items-center ${
              isOpen != entList.name
                ? "bg-pbg hover:bg-pred text-white hover:text-black"
                : "bg-pred text-black"
            } font-bold text-xs tracking-[1.25px] text-[#f9f9f9] outline-none capitalize transition ease-in-out duration-300`}
            onClick={() => setIsOpen(entList.name)}
          >
            {entList.name == "categories" ? "subcategories" : entList.name} (
            {entList.entityList?.length ?? 0})
          </button>
        ))}
      </div>
      {entities?.map((entList, i) => (
        <table
          key={i}
          className={`table w-full  ${
            isOpen != entList.name ? "hidden" : "block"
          }  transition-all ease-in-out duration-150`}
        >
          <thead className="relative mt-1">
            <tr
              className={`grid grid-cols-${
                entList.name == "notes"
                  ? "4"
                  : entList.name == "categories" || entList.name == "pictograms"
                  ? "3"
                  : "2"
              } *:border-l *:border-r *:border-t-0 *:border-b-0`}
            >
              <th className="flex justify-center items-center gap-1">
                {entList.name == "notes" &&
                (pathname.includes("users") || pathname.split("/").length == 2)
                  ? "Patient"
                  : entList.name == "notes" && pathname.includes("patients")
                  ? "Thérapeute"
                  : entList.name == "patients" || entList.name == "users"
                  ? "Nom"
                  : "Titre"}
              </th>
              {(entList.name == "notes" ||
                entList.name == "pictograms" ||
                entList.name == "categories") && (
                <th className="flex justify-center items-center gap-1">
                  {entList.name == "notes" ? "Estimation" : "Image"}
                </th>
              )}
              {entList.name == "notes" && (
                <th className="flex justify-center items-center gap-1">
                  {entList.name == "notes" ? "Date" : "Titre"}
                </th>
              )}
              <th className="flex justify-center items-center gap-1">
                <p>Actions</p>
                {entList.name == "notes" && session?.id == patient?.user?.id && (
                  <Link
                    className={`relative bg-pbg hover:bg-pred transition ease-in-out duration-300 h-5 w-10 rounded-3xl font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1 group`}
                    href={`/dashboard/${entList.name}/create?user=${session?.id}&patient=${patient.id}`}
                  >
                    <CreateIcon />
                  </Link>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-1 max-h-80 overflow-y-auto">
            {entList.entityList?.length > 0 &&
              entList.entityList.map((el, j) => (
                <EntityItem
                  key={j}
                  session={session}
                  entity={el}
                  entityName={entList.name}
                  isSublist={true}
                />
              ))}
          </tbody>
        </table>
      ))}
    </>
  );
};

export default Accordion;
