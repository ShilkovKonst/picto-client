import Link from "next/link";
import React from "react";
import UpdateIcon from "../icons/updateIcon";
import ActionDelete from "./_actionDelete";

const ActionsHeader = ({ entity, entityName }) => {
  return (
    <div className="flex ml-3 flex-row items-center justify-evenly md:justify-end gap-3">      
      <Link
        href={`/dashboard/${entityName}/${entity.id}/update`}
        className="group relative bg-pbg hover:bg-pred transition ease-in-out duration-300 h-10 w-10 rounded-3xl px-2 font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1"
      >
        <UpdateIcon />
        <div className="hidden group-hover:block absolute bottom-[100%] left-0 rounded-lg pb-1 cursor-default">
          <p className="text-xs text-black">Modifier</p>
        </div>
      </Link>
      <ActionDelete entity={entity} type="header" />
    </div>
  );
};

export default ActionsHeader;
