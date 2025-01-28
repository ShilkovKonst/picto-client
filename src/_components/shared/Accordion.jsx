import { useState } from "react";
import EntityTableItem from "../dashboard/EntityTableItem";
import { usePathname } from "next/navigation";
import AccordionHeaderButton from "./AccordionHeaderButton";
import AccordionTableHeader from "./AccordionTableHeader";

const Accordion = ({ initial, entities, session, user, patient, institution }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(initial);

  return (
    <>
      <div className={`grid grid-cols-${entities?.length} gap-1`}>
        {entities?.map((entity, i) => (
          <AccordionHeaderButton
            key={i}
            entity={entity}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
      {entities?.map((entity, i) => (
        <section
          key={i}
          className={`table w-full *:*:*:border-gray-300 border-t border-secondary  ${
            isOpen != entity.name ? "hidden" : "block"
          } transition-all ease-in-out duration-150`}
        >
          <AccordionTableHeader
            session={session}
            pathname={pathname}
            entityName={entity.name}
            patient={patient}
            user={user}
          />
          <div className="accordion flex flex-col gap-1 max-h-80 overflow-y-auto rounded-br-[9px] rounded-tr-[9px] border-t border-b border-gray-300">
            <div className="grid grid-cols-1"></div>
            {entity.list?.length > 0 &&
              entity.list.map((el, j) => (
                <EntityTableItem
                  key={j}
                  user={user}
                  session={session}
                  entity={el}
                  entityName={entity.name}
                  isSublist={true}
                  institution={institution}
                />
              ))}
            <div className="grid grid-cols-1"></div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Accordion;
