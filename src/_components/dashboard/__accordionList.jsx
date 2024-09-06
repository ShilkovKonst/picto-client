"use client"
import { Accordion } from "flowbite-react";
import Link from "next/link";
import React from "react";

const AccordionList = ({ entityName, entity }) => {
  return (
    <Accordion.Panel>
      <Accordion.Title>
        {entityName == "questions" && "Questions"}
        {entityName == "pictograms" && "Pictogrammes"}
        {entityName == "subcategories" && "Sous-catégories"}
      </Accordion.Title>
      <Accordion.Content>
        <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
          {entity?.length > 0 &&
            entity?.map((ent, i) => (
              <li key={i}>
                <Link
                  href={`/dashboard/questions/${ent?.id}`}
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  {ent?.title}
                </Link>
              </li>
            ))}
        </ul>
      </Accordion.Content>
    </Accordion.Panel>
  );
};

export default AccordionList;
