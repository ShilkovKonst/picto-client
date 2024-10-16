import ActionsTable from "@/_components/common/actionsTable";
import Link from "next/link";
import React from "react";
import MediaField from "./__mediaField";

const EntityItem = ({ entity, entityName, isSublist }) => {
  return (
    <tr className={`flex flex-row justify-between items-center text-sm sm:text-base border-t border-b ${isSublist ? "h-14" : "h-16 md:h-14"}  group/item`}>
      <td
        className={`text-center md:text-start ${
          entityName == "categories" || entityName == "pictograms"
            ? "w-1/3 md:w-2/5"
            : "w-1/2"
        }`}
      >
        <Link
          href={`/dashboard/${entityName}/${entity?.id}`}
          className="w-full flex items-center"
        >
          <div className="py-5 me-2 h-0 w-1 bg-transparent group-hover/item:bg-pbg transition ease-in-out duration-300"></div>
          <p className="w-full text-center md:text-start">{entityName == "users" ? entity.firstName + " " + entity.lastName : entity?.title}</p>
        </Link>
      </td>
      {(entityName == "categories" || entityName == "pictograms") && (
        <MediaField entity={entity} entityName={entityName} isSublist={isSublist} />
      )}
      <td
        className={`flex items-center justify-center ${
          entityName == "categories" || entityName == "pictograms"
            ? "w-1/3 md:w-2/5"
            : "w-1/2"
        }`}
      >
        <ActionsTable entity={entity} entityName={entityName} isSublist={isSublist} />
      </td>
    </tr>
  );
};

export default EntityItem;
