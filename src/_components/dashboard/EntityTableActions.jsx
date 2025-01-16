"use client";
import { BrainIcon, SpeechIcon, UpdateIcon } from "@/_components/icons";
import DeleteAction from "@/_components/_shared/DeleteAction";
import LinkAction from "@/_components/_shared/LinkAction";
import ButtonAction from "@/_components/_shared/ButtonAction";
import { textToSpeech } from "@/_lib/textToSpeech";
import {
  isAdmin,
  isNotInstitutionsOrUsersOrPatientsorNotes,
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
        isSessionInstitutionByInstitution ||
        isNotInstitutionsOrUsersOrPatientsorNotes(entityName)));

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
            isSublist={false}
            href={`/seance?patient=${entity.id}`}
            icon={<BrainIcon isSublist={isSublist} />}
            title={"Lancer une séance"}
            position={"top"}
            type="info"
          />
        )}
      {(entityName == "pictograms" || entityName == "categories") && (
        <ButtonAction
          handleClick={() => textToSpeech(entity.title)}
          icon={<SpeechIcon isSublist={isSublist} />}
          title={"Voix"}
          isSublist={isSublist}
          position={"top"}
          type="info"
        />
      )}
      {session.active && session.verified && updateDeleteCondition && (
        <LinkAction
          isSublist={isSublist}
          href={`/dashboard/${entityName}/${entity.id}/update`}
          icon={<UpdateIcon isSublist={isSublist} />}
          title={"Modifier"}
          position={"top"}
          type="info"
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
