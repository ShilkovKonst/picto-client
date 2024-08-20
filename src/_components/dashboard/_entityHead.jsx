import ActionsHeader from "@/_components/common/actionsHeader";
import Link from "next/link";
import React from "react";

const EntityHead = ({ entity, entityName }) => {
  return (
    <thead>
      <tr className="border-b">
        {entity ? (
          <th className="text-lg md:text-xl flex justify-center items-center">
            <span className=" mx-auto">
              {entityName == "categories" && "Catégorie:"}
              {entityName == "pictograms" && "Pictogramme:"}
              {entityName == "questions" && "Question:"}
              {entityName == "tags" && "Tag:"}
              <Link
                className="hover:text-pred trasition duration-150 ease-in-out ml-3"
                href={`/dashboard/${entityName}/${entity?.id}`}
              >
                {entity?.title}
              </Link>
            </span>
            <ActionsHeader entity={entity} entityName={entityName} />
          </th>
        ) : (
          <th className="text-lg md:text-xl flex justify-center items-center">
            <span className=" mx-auto">
              {entityName == "categories" && "Créer une nouvelle catégorie"}
              {entityName == "pictograms" && "Créer une nouvelle pictogramme"}
              {entityName == "questions" && "Créer une nouvelle question"}
              {entityName == "tags" && "Créer un nouvel tag"}
            </span>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default EntityHead;
