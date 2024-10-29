import ActionsTable from "@/_components/common/actionsTable";
import Link from "next/link";
import React from "react";
import MediaField from "./__mediaField";
import NoteField from "./__noteField";
import UserField from "./__userField";
import PatientField from "./__patientField";

const EntityItem = ({ entity, entityName, isSublist }) => {
  return (
    <tr className="grid grid-cols-1">
      <td className={`grid border-t border-b ${
            entityName == "users" || entityName == "patients"
              ? "grid-cols-8"
              : entityName == "notes"
              ? "grid-cols-4"
              : entityName == "pictograms" || entityName == "categories"
              ? "grid-cols-3"
              : "grid-cols-2"
          } ${
            isSublist ? "h-14" : "h-16 md:h-14"
          }  group/item hover:bg-pbg-trans-10 transition ease-in-out duration-300`}>
        <Link
          href={`/dashboard/${entityName}/${entity?.id}`}
          className={`grid justify-between items-center text-sm sm:text-base ${
            entityName == "users" || entityName == "patients"
              ? "col-span-5 grid-cols-5"
              : entityName == "notes"
              ? "col-span-3 grid-cols-3"
              : entityName == "pictograms" || entityName == "categories"
              ? "col-span-2 grid-cols-2"
              : "grid-cols-1"
          } ${
            isSublist ? "h-12" : "h-16 md:h-14"
          }`}
        >
          <div
            className={`flex justify-center items-center text-center md:text-start ${
              entityName == "users" || entityName == "patients"
                ? "col-span-3"
                : "col-span-1"
            }`}
          >
            <div className="py-[27px] me-2 h-0 w-1 bg-transparent group-hover/item:bg-pbg transition ease-in-out duration-300"></div>
            <p className="w-full text-center md:text-start capitalize">
              {entityName == "notes"
                ? entity.user.firstName.slice(0, 1) +
                  ". " +
                  entity.user.lastName
                : entityName == "users" || entityName == "patients"
                ? entity.firstName.slice(0, 1) + ". " + entity.lastName
                : entity?.title}
            </p>
          </div>
          {(entityName == "categories" || entityName == "pictograms") && (
            <MediaField
              entity={entity}
              entityName={entityName}
              isSublist={isSublist}
            />
          )}
          {entityName == "notes" && <NoteField entity={entity} />}
          {entityName == "users" && <UserField entity={entity} />}
          {entityName == "patients" && <PatientField entity={entity} />}
        </Link>
        <div
          className={`flex items-center justify-center ${
            entityName == "users" || entityName == "patients"
              ? "col-span-3"
              : "col-span-1"
          }`}
        >
          <ActionsTable
            entity={entity}
            entityName={entityName}
            isSublist={isSublist}
          />
        </div>
      </td>
    </tr>
  );
};

export default EntityItem;
