import { CreateIcon } from "../icons"
import LinkAction from "./LinkAction"

const AccordionHeader = ({entityName, pathname, session, user, patient }) => {
  return (
    <thead className="relative">
    <tr
      className={`h-8 grid grid-cols-${
        entityName == "notes"
          ? "4"
          : entityName == "categories" || entityName == "pictograms"
          ? "3"
          : "2"
      } *:border-l-0 *:border-r-0 *:border-t-0 *:border-b-0 *:text-sm md:*:text-base my-1`}
    >
      <th className="flex justify-center items-center gap-1">
        {entityName == "notes" &&
        (pathname.includes("users") || pathname.split("/").length == 2)
          ? "Patient"
          : entityName == "notes" && pathname.includes("patients")
          ? "Thérapeute"
          : entityName == "patients" || entityName == "users"
          ? "Nom"
          : "Titre"}
      </th>
      {(entityName == "notes" ||
        entityName == "pictograms" ||
        entityName == "categories") && (
        <th className="flex justify-center items-center gap-1">
          {entityName == "notes" ? "Estimation" : "Image"}
        </th>
      )}
      {entityName == "notes" && (
        <th className="flex justify-center items-center gap-1">
          {entityName == "notes" ? "Date" : "Titre"}
        </th>
      )}
      <th className="relative flex justify-center items-center gap-1">
        <p className="mr-6 lg:mr-0">Actions</p>
        {session.active &&
          session.verified &&
          (entityName == "notes" || entityName == "patients") &&
          (session.roles.includes("ROLE_ADMIN") ||
            session.id == user?.id) && (
            <div className="absolute right-3 top-0 bottom-0 flex justify-center items-center">
              <LinkAction
                icon={<CreateIcon isSublist={true} />}
                isSublist={true}
                title={"Créer"}
                position="top"
                type="info"
                href={`/dashboard/${entityName}/create?user=${
                  session?.id
                }${patient ? "&patient=" + patient?.id : ""}`}
              />
            </div>
          )}
      </th>
    </tr>
  </thead>
  )
}

export default AccordionHeader