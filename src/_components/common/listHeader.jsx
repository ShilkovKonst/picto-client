import Link from "next/link";
import React from "react";
import CreateIcon from "../icons/createIcon";

const ListHeader = ({ entityName }) => {
  return (
    <thead>
      <tr className="border-b">
        <th className="text-lg flex justify-between items-center">
          <span className=" mx-auto">{entityName == "pictograms" ? "PICTOGRAMMES" : entityName.toUpperCase()}</span>
          <Link
            className="relative bg-pbg hover:bg-pred transition ease-in-out duration-300 h-10 w-10 rounded-3xl px-2 font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1 group mx-4"
            href={`/dashboard/${entityName}/create`}
          >
            <CreateIcon />
            <div className="hidden group-hover:block absolute bottom-[100%] left-0 rounded-lg pb-1 cursor-default w-auto">
              <p className="text-xs text-black">Créer</p>
            </div>
          </Link>
        </th>
      </tr>
    </thead>
  );
};

export default ListHeader;
