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
              {entityName == "institutions" && "Institution:"}
              {entityName == "users" && "Thérapeute:"}
              {entityName == "patients" && "Patient:"}
              {entityName == "notes" && "Note:"}
              <Link
                className="hover:text-pred trasition duration-150 ease-in-out ml-3"
                href={`/dashboard/${entityName}/${entity?.id}`}
              >
                {entityName != "users" && entityName != "patients" ? entity?.title : entity.firstName.slice(0, 1) + ". " + entity.lastName}
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
              {entityName == "tags" && "Créer un nouveau tag"}
              {entityName == "institutions" && "Créer une nouvelle institution"}
              {entityName == "users" && "Créer un nouveau thérapeute"}
              {entityName == "patients" && "Créer un nouveau patient"}
              {entityName == "notes" && "Créer une nouvelle note"}
            </span>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default EntityHead;
