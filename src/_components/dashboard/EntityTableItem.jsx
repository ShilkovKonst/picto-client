import Link from "next/link";
import TableMediaField from "@/_components/dashboard/TableMediaField";
import TableNoteField from "@/_components/dashboard/TableNoteField";
import TableUserField from "@/_components/dashboard/TableUserField";
import TablePatientField from "@/_components/dashboard/TablePatientField";
import EntityTableActions from "@/_components/dashboard/EntityTableActions";
import { isAdmin, isSuperAdmin } from "@/_lib/checkConditions";

const EntityTableItem = ({
  session,
  entity,
  entityName,
  isSublist,
  user,
  institution,
}) => {
  return (
    <div className="grid grid-cols-1">
      <div
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
          isSublist ? "h-[50px]" : "h-[66px] md:h-[58px]"
        } border-t border-b group/item p-0`}
      >
        <Link
          href={
            entityName == "users" && entity.id == session.id
              ? `/dashboard`
              : `/dashboard/${entityName}/${entity?.id}`
          }
          className={`grid text-sm sm:text-base bg-gradient-to-r hover:from-primary-trans-30 from-90% hover:to-transparent transition-all ease-in-out duration-300 ${
            isSublist
              ? entityName == "notes"
                ? "col-span-3 grid-cols-3"
                : entityName == "pictograms" || entityName == "categories"
                ? "col-span-2 grid-cols-2"
                : "grid-cols-1"
              : entityName == "users" || entityName == "patients"
              ? "col-span-6 grid-cols-6"
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
                (entityName == "users" || entityName == "patients") &&
                (isSuperAdmin(session) || isAdmin(session))
                  ? "col-span-2"
                  : entityName == "users" || entityName == "patients"
                  ? "col-span-4"
                  : "col-span-1"
              } ${
                isSublist ? "before:py-[24px]" : "before:py-[27px]"
              } before:me-1 before:h-0 before:w-1 before:bg-transparent group-hover/item:before:bg-primary `}
            >
              <p className="w-full text-sm md:text-base text-center md:text-start capitalize">
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
          {!isSublist &&
            (entityName == "users" || entityName == "patients") &&
            (isSuperAdmin(session) || isAdmin(session)) && (
              <div className="flex justify-center md:justify-start items-center text-sm md:text-base col-span-2">
                {entityName == "users"
                  ? entity?.institution?.title
                  : entity?.user?.institution?.title}
              </div>
            )}
          {(entityName == "categories" || entityName == "pictograms") && (
            <TableMediaField
              entity={entity}
              entityName={entityName}
              isSublist={isSublist}
            />
          )}
          {entityName == "notes" && (
            <TableNoteField entity={entity} isSublist={isSublist} />
          )}
          {!isSublist && entityName == "users" && (
            <TableUserField entity={entity} isSublist={isSublist} />
          )}
          {!isSublist && entityName == "patients" && (
            <TablePatientField entity={entity} isSublist={isSublist} />
          )}
        </Link>
        <div
          className={`flex items-center justify-center ${
            !isSublist && (entityName == "users" || entityName == "patients")
              ? "col-span-2"
              : "col-span-1"
          }`}
        >
          <EntityTableActions
            session={session}
            entity={entity}
            entityName={entityName}
            isSublist={isSublist}
            user={user}
            institution={institution}
          />
        </div>
      </div>
    </div>
  );
};

export default EntityTableItem;
