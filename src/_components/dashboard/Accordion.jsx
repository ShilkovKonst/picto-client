import { useState } from "react";
import EntityTableItem from "../_shared/EntityTableItem";
import { usePathname } from "next/navigation";
import { CreateIcon } from "../icons";
import AccordionHeaderButton from "../_shared/atoms/AccordionHeaderButton";
import LinkButtonAction from "../_shared/atoms/LinkButtonAction";

const Accordion = ({ initial, entities, session, user, patient }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(initial);

  return (
    <>
      <div className={`grid grid-cols-${entities?.length} gap-1`}>
        {entities?.map((entList, i) => (
          <AccordionHeaderButton
            key={i}
            entList={entList}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
      {entities?.map((entList, i) => (
        <table
          key={i}
          className={`table w-full *:*:*:border-gray-300 border-t border-secondary  ${
            isOpen != entList.name ? "hidden" : "block"
          } transition-all ease-in-out duration-150`}
        >
          <thead className="relative">
            <tr
              className={`h-8 grid grid-cols-${
                entList.name == "notes"
                  ? "4"
                  : entList.name == "categories" || entList.name == "pictograms"
                  ? "3"
                  : "2"
              } *:border-l-0 *:border-r-0 *:border-t-0 *:border-b-0 mb-1`}
            >
              <th className="flex justify-center items-center gap-1">
                {entList.name == "notes" &&
                (pathname.includes("users") || pathname.split("/").length == 2)
                  ? "Patient"
                  : entList.name == "notes" && pathname.includes("patients")
                  ? "Thérapeute"
                  : entList.name == "patients" || entList.name == "users"
                  ? "Nom"
                  : "Titre"}
              </th>
              {(entList.name == "notes" ||
                entList.name == "pictograms" ||
                entList.name == "categories") && (
                <th className="flex justify-center items-center gap-1">
                  {entList.name == "notes" ? "Estimation" : "Image"}
                </th>
              )}
              {entList.name == "notes" && (
                <th className="flex justify-center items-center gap-1">
                  {entList.name == "notes" ? "Date" : "Titre"}
                </th>
              )}
              <th className="relative flex justify-center items-center gap-1">
                <p className="mr-6 lg:mr-0">Actions</p>
                {session.active &&
                  session.verified &&
                  (entList.name == "notes" || entList.name == "patients") &&
                  (session.roles.includes("ROLE_ADMIN") ||
                    session.id == user?.id) && (
                    <div className="absolute right-3 top-0 bottom-0 flex justify-center items-center">
                      <LinkButtonAction
                        icon={<CreateIcon isSublist={true} />}
                        isSublist={true}
                        title={"Créer"}
                        position="top"
                        type="info"
                        href={`/dashboard/${entList.name}/create?user=${
                          session?.id
                        }${patient ? "&patient=" + patient?.id : ""}`}
                      />
                    </div>
                  )}
              </th>
            </tr>
          </thead>
          <tbody className="accordion flex flex-col gap-1 max-h-80 overflow-y-auto rounded-br-[9px] rounded-tr-[9px] border-t border-b border-gray-300">
            <tr className="grid grid-cols-1"></tr>
            {entList.entityList?.length > 0 &&
              entList.entityList.map((el, j) => (
                <EntityTableItem
                  key={j}
                  session={session}
                  entity={el}
                  entityName={entList.name}
                  isSublist={true}
                />
              ))}
            <tr className="grid grid-cols-1"></tr>
          </tbody>
        </table>
      ))}
    </>
  );
};

export default Accordion;
