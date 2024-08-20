import ActionsTable from "@/_components/common/actionsTable";
import Link from "next/link";
import React from "react";
import MediaField from "./_mediaField";

const EntityItem = ({ entity, entityName }) => {
  return (
    <tr className="flex flex-row justify-between items-center text-sm sm:text-base border-b h-10 md:h-14">
      
      <td
        className={`text-center md:text-start ${
          entityName == "categories" || entityName == "pictograms"
            ? "w-1/3 md:w-2/5"
            : "w-1/2"
        }`}
      >
        <Link
          href={`/dashboard/${entityName}/${entity?.id}`}
          className="w-full flex group items-center"
        >
          <div className="py-5 me-2 h-0 w-1 bg-transparent group-hover:bg-pbg transition ease-in-out duration-300"></div>
          <p className="w-full text-center md:text-start">{entity?.title}</p>
        </Link>
      </td>
      {(entityName == "categories" || entityName == "pictograms") && (
        <MediaField entity={entity} entityName={entityName} />
      )}
      <td
        className={`flex items-center justify-center ${
          entityName == "categories" || entityName == "pictograms"
            ? "w-1/3 md:w-2/5"
            : "w-1/2"
        }`}
      >
        <ActionsTable entity={entity} entityName={entityName} />
      </td>
    </tr>
  );
};

export default EntityItem;
