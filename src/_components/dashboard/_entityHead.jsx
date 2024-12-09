import ActionsHeader from "@/_components/common/actionsHeader";
import Link from "next/link";
import React from "react";
import { SuccessIcon, WarningIcon } from "../icons";

const EntityHead = ({ entity, entityName, session }) => {
  return (
    <thead>
      <tr className="">
        {entity ? (
          <th className="text-lg md:text-xl flex justify-center items-center min-h-[50px]">
            <span className="flex justify-center items-center mx-auto">
              {entityName == "categories" && "Catégorie:"}
              {entityName == "pictograms" && "Pictogramme:"}
              {entityName == "questions" && "Question:"}
              {entityName == "tags" && "Tag:"}
              {entityName == "institutions" && "Institution:"}
              {entityName == "users" && "Thérapeute:"}
              {entityName == "patients" && "Patient:"}
              {entityName == "notes" && "Note:"}
              <Link
                className="hover:text-pred trasition duration-150 ease-in-out ml-3 me-1"
                href={entityName == "users" && entity.id == session.id ? "/dashboard" : `/dashboard/${entityName}/${entity?.id}`}
              >
                {entityName == "users" || entityName == "patients" ? (
                  <div>
                    {entity?.firstName?.slice(0, 1) + ". " + entity?.lastName}{" "}
                  </div>
                ) : entityName == "notes" ? (
                  entity?.estimation
                ) : (
                  entity?.title
                )}
              </Link>
              {(entityName == "users" || entityName == "patients") && (entity?.active ? <SuccessIcon /> : <WarningIcon />)}
            </span>
            {(entityName != "users" || session?.id != entity?.id) && <ActionsHeader session={session} entity={entity} entityName={entityName} />}
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
