import {
  isAdmin,
  isNotInstitutionsOrUsersOrPatientsOrNotes,
  isSuperAdmin,
} from "@/_lib/checkConditions";
import { CreateIcon } from "../icons";
import LinkAction from "./LinkAction";

const AccordionHeader = ({ entityName, pathname, session, user, patient }) => {
  const isSessionUser = user?.id == session.id;
  const isSessionInstitutionByUser =
    user?.institution?.id == session.institution.id;
  const updateDeleteCondition =
    isSuperAdmin(session) ||
    (isAdmin(session) && isSessionInstitutionByUser) ||
    isSessionUser ||
    isNotInstitutionsOrUsersOrPatientsOrNotes(entityName);
  return (
    <div className="relative">
      <div
        className={`h-8 grid grid-cols-${
          entityName == "notes"
            ? "4"
            : entityName == "categories" || entityName == "pictograms"
            ? "3"
            : "2"
        } *:border-l-0 *:border-r-0 *:border-t-0 *:border-b-0 *:text-sm md:*:text-base my-1`}
      >
        <p className="flex justify-center items-center gap-1">
          {entityName == "notes" &&
          (pathname.includes("users") || pathname.split("/").length == 2)
            ? "Patient"
            : entityName == "notes" && pathname.includes("patients")
            ? "Thérapeute"
            : entityName == "patients" || entityName == "users"
            ? "Nom"
            : "Titre"}
        </p>
        {(entityName == "notes" ||
          entityName == "pictograms" ||
          entityName == "categories") && (
          <p className="flex justify-center items-center gap-1">
            {entityName == "notes" ? "Estimation" : "Image"}
          </p>
        )}
        {entityName == "notes" && (
          <p className="flex justify-center items-center gap-1">
            {entityName == "notes" ? "Date" : "Titre"}
          </p>
        )}
        <div className="relative flex justify-center items-center gap-1">
          <p className="mr-6 lg:mr-0">Actions</p>
          {session.active && session.verified && updateDeleteCondition && (
            <div className="absolute right-3 top-0 bottom-0 flex justify-center items-center">
              <LinkAction
                icon={<CreateIcon isSublist={true} />}
                isSublist={true}
                title={"Créer"}
                href={`/dashboard/${entityName}/create?user=${session?.id}${
                  patient ? "&patient=" + patient?.id : ""
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionHeader;
