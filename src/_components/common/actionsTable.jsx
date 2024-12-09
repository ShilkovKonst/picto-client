"use client";
import Link from "next/link";
import UpdateIcon from "../icons/updateIcon";
import ActionDelete from "./_actionDelete";

const ActionsTable = ({ session, entity, entityName, isSublist }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-evenly gap-3">
        <Link
          href={`/dashboard/${entityName}/${entity.id}/update`}
          className={`relative bg-primary hover:bg-secondary transition ease-in-out duration-300 ${
            isSublist ? "w-6 h-6 md:w-8" : "w-8 h-8"
          } rounded-3xl font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm mt-2 group`}
        >
          <UpdateIcon isSublist={isSublist} />
          <div
            className={`hidden group-hover:block absolute bottom-[100%] left-0 ${
              !isSublist && "pb-0"
            } rounded-lg cursor-default z-50`}
          >
            <p className="text-xs text-black">Modifier</p>
          </div>
        </Link>
        {session?.roles?.includes("ROLE_SUPERADMIN") && (
          <ActionDelete
            entity={entity}
            entityName={entityName}
            isSublist={isSublist}
          />
        )}
      </div>
    </>
  );
};

export default ActionsTable;
