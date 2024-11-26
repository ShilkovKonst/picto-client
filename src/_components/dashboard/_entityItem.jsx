import ActionsTable from "@/_components/common/actionsTable";
import Link from "next/link";
import React from "react";
import MediaField from "./__mediaField";
import NoteField from "./__noteField";
import UserField from "./__userField";
import PatientField from "./__patientField";

const EntityItem = ({ session, entity, entityName, isSublist }) => {
  return (
    <tr className="grid grid-cols-1">
      <td
        className={`grid ${
          isSublist
            ? entityName == "notes"
              ? "grid-cols-4"
              : entityName == "pictograms" || entityName == "categories"
              ? "grid-cols-3"
              : "grid-cols-2"
            : entityName == "users" || entityName == "patients"
            ? "grid-cols-8"
            : entityName == "notes"
            ? "grid-cols-4"
            : entityName == "pictograms" || entityName == "categories"
            ? "grid-cols-3"
            : "grid-cols-2"
        } ${
          isSublist ? "h-[50px]" : "h-16 md:h-14"
        } border-t border-b group/item p-0`}
      >
        <Link
          href={`/dashboard/${entityName}/${entity?.id}`}
          className={`grid text-sm sm:text-base bg-gradient-to-r hover:from-pbg-trans-30 from-90% hover:to-transparent transition-all ease-in-out duration-300 ${
            isSublist
              ? entityName == "notes"
                ? "col-span-3 grid-cols-3"
                : entityName == "pictograms" || entityName == "categories"
                ? "col-span-2 grid-cols-2"
                : "grid-cols-1"
              : entityName == "users" || entityName == "patients"
              ? "col-span-5 grid-cols-5"
              : entityName == "notes"
              ? "col-span-3 grid-cols-3"
              : entityName == "pictograms" || entityName == "categories"
              ? "col-span-2 grid-cols-2"
              : "grid-cols-1"
          } ${isSublist ? "h-12" : "h-16 md:h-14"}`}
        >
          {entityName != "notes" && (
            <div
              className={`flex justify-center items-center text-center md:text-start ${
                entityName == "users" || entityName == "patients"
                  ? "col-span-3"
                  : "col-span-1"
              } ${
                isSublist ? "before:py-[24px]" : "before:py-[27px]"
              } before:me-1 before:h-0 before:w-1 before:bg-transparent group-hover/item:before:bg-pbg `}
            >
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
          )}
          {(entityName == "categories" || entityName == "pictograms") && (
            <MediaField
              entity={entity}
              entityName={entityName}
              isSublist={isSublist}
            />
          )}
          {entityName == "notes" && (
            <NoteField entity={entity} isSublist={isSublist} />
          )}
          {!isSublist && entityName == "users" && (
            <UserField entity={entity} isSublist={isSublist} />
          )}
          {!isSublist && entityName == "patients" && (
            <PatientField entity={entity} isSublist={isSublist} />
          )}
        </Link>
        <div
          className={`flex items-center justify-center ${
            !isSublist && (entityName == "users" || entityName == "patients")
              ? "col-span-3"
              : "col-span-1"
          }`}
        >
          {(entityName != "users" || entity.id != session.id) && (
            <ActionsTable
              entity={entity}
              entityName={entityName}
              isSublist={isSublist}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default EntityItem;
