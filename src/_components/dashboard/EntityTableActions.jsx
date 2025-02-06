"use client";
import { BrainIcon, SpeechIcon, UpdateIcon } from "@/_components/icons";
import DeleteAction from "@/_components/shared/DeleteAction";
import LinkAction from "@/_components/shared/LinkAction";
import ButtonAction from "@/_components/shared/ButtonAction";
import { textToSpeech } from "@/_lib/textToSpeech";
import {
  isAdmin,
  isNotInstitutionsOrUsersOrPatientsOrNotes,
  isSessionsInstitution,
  isSessionsPatientOrNote,
  isSuperAdmin,
} from "@/_lib/checkConditions";

const EntityTableActions = ({
  session,
  entity,
  entityName,
  isSublist,
  user,
  institution,
}) => {
  const isSessionInstitutionByUser =
    isSublist && user?.institution?.id == session.institution.id;
  const isSessionInstitutionByInstitution =
    isSublist && institution?.id == session.institution.id;
  const updateDeleteCondition =
    isSuperAdmin(session) ||
    isSessionsPatientOrNote(session, entityName, entity) ||
    (isAdmin(session) &&
      (isSessionsInstitution(session, entityName, entity) ||
        isSessionInstitutionByUser ||
        isSessionInstitutionByInstitution)) ||
    isNotInstitutionsOrUsersOrPatientsOrNotes(entityName);

  return (
    <div
      className={`flex flex-row items-center justify-evenly ${
        !isSublist ? "w-full md:w-auto" : ""
      } gap-1 md:gap-3 ${isSublist ? "mt-2" : ""}`}
    >
      {session.active &&
        session.verified &&
        entityName == "patients" &&
        entity.active && (
          <LinkAction
            title={"Lancer une séance"}
            isSublist={isSublist}
            href={`/seance?patient=${entity.id}`}
            icon={<BrainIcon isSublist={isSublist} />}
          />
        )}
      {(entityName == "pictograms" || entityName == "categories") && (
        <ButtonAction
          title={"Voix"}
          isSublist={isSublist}
          icon={<SpeechIcon isSublist={isSublist} />}
          handleClick={() => textToSpeech(entity.title)}
        />
      )}
      {session.active && session.verified && updateDeleteCondition && (
        <LinkAction
          title={"Modifier"}
          isSublist={isSublist}
          icon={<UpdateIcon isSublist={isSublist} />}
          href={`/dashboard/${entityName}/${entity.id}/update`}
        />
      )}
      {session.active && session.verified && updateDeleteCondition && (
        <DeleteAction
          entity={entity}
          entityName={entityName}
          isSublist={isSublist}
        />
      )}
    </div>
  );
};

export default EntityTableActions;
