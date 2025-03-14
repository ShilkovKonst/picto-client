import Link from "next/link";
import { SuccessIcon } from "../icons";
import EntityHeaderActions from "@/_components/dashboard/EntityHeaderActions";
import PersonWarningBlock from "./PersonWarningBlock";

const EntityHeader = ({ entity, entityName, session }) => {
  const title = {
    institutions: entity?.title,
    users: entity?.firstName?.slice(0, 1) + ". " + entity?.lastName,
    patients: entity?.firstName?.slice(0, 1) + ". " + entity?.lastName,
    notes: entity?.estimation,
    categories: entity?.title,
    pictograms: entity?.title,
    questions: entity?.title,
    tags: entity?.title,
  };

  return (
    <div className="">
      {entity ? (
        <div className="text-lg md:text-xl flex justify-center items-center min-h-12">
          <span className="flex justify-center items-center mx-auto">
            {preTitle[entityName]}
            <Link
              className="hover:text-secondary font-semibold trasition duration-150 ease-in-out ml-3 me-1"
              href={
                entityName == "users" && entity.id == session.id
                  ? "/dashboard"
                  : `/dashboard/${entityName}/${entity?.id}`
              }
            >
              {title[entityName]}
            </Link>
            {(entityName == "users" || entityName == "patients") &&
              (entity?.active ? (
                <SuccessIcon />
              ) : (
                <PersonWarningBlock
                  position={"top"}
                  title={"Ce patient est inactif."}
                  type={"alert"}
                />
              ))}
          </span>
          {(entityName != "users" ||
            (entityName == "users" && session?.id != entity?.id)) && (
            <EntityHeaderActions
              session={session}
              entity={entity}
              entityName={entityName}
            />
          )}
        </div>
      ) : (
        <div className="text-lg md:text-xl flex justify-center items-center min-h-12">
          <span className=" mx-auto">{noTitle[entityName]}</span>
        </div>
      )}
    </div>
  );
};

const preTitle = {
  categories: "Catégorie:",
  pictograms: "Pictogramme:",
  questions: "Question:",
  tags: "Tag:",
  institutions: "Institution:",
  users: "Thérapeute:",
  patients: "Patient:",
  notes: "Note:",
};

const noTitle = {
  categories: "Créer une nouvelle catégorie",
  pictograms: "Créer une nouvelle pictogramme",
  questions: "Créer une nouvelle question",
  tags: "Créer un nouveau tag",
  institutions: "Créer une nouvelle institution",
  users: "Créer un nouveau thérapeute",
  patients: "Créer un nouveau patient",
  notes: "Créer une nouvelle note",
};

export default EntityHeader;
