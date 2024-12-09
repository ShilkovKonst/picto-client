import Link from "next/link";
import React from "react";
import UpdateIcon from "../icons/updateIcon";
import ActionDelete from "./_actionDelete";

const ActionsHeader = ({ session, entity, entityName }) => {
  return (
    <div className="flex ml-3 flex-row items-center justify-evenly md:justify-end gap-3">
      <Link
        href={`/dashboard/${entityName}/${entity.id}/update`}
        className="group relative bg-primary hover:bg-secondary transition ease-in-out duration-300 h-8 w-8 rounded-3xl font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1"
      >
        <UpdateIcon isSublist={false} />
        <div className="hidden group-hover:block absolute bottom-[100%] right-0 rounded-lg cursor-default">
          <p className="text-xs text-black">Modifier</p>
        </div>
      </Link>
      {session?.roles?.includes("ROLE_SUPERADMIN") && (
        <ActionDelete entity={entity} entityName={entityName} />
      )}
    </div>
  );
};

export default ActionsHeader;
