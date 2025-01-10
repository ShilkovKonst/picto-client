import { BrainIcon, SpeechIcon, UpdateIcon } from "@/_components/icons";
import LinkAction from "../_shared/LinkAction";
import DeleteAction from "../_shared/DeleteAction";
import ButtonAction from "../_shared/ButtonAction";
import { textToSpeech } from "@/_lib/textToSpeech";
import {
  isAdmin,
  isSuperAdmin,
  isNotInstitutionsOrUsersOrPatients,
  isSessionsInstitution,
  isSessionsPatientOrNote,
} from "@/_lib/checkConditions";

const EntityHeaderActions = ({ session, entity, entityName }) => {
  const updateDeleteCondition =
    isSuperAdmin(session) ||
    isSessionsPatientOrNote(session, entityName, entity) ||
    (isAdmin(session) &&
      (isSessionsInstitution(session, entityName, entity) ||
        isNotInstitutionsOrUsersOrPatients(entityName)));

  return (
    <div className="flex ml-3 flex-row items-center justify-evenly md:justify-end gap-3">
      {session.active &&
        session.verified &&
        entityName == "patients" &&
        entity.active && (
          <LinkAction
            isSublist={false}
            href={`/seance?patient=${entity.id}`}
            icon={<BrainIcon isSublist={false} />}
            title={"Lancer une séance"}
            position={"top"}
            type="info"
          />
        )}
      {(entityName == "pictograms" || entityName == "categories") && (
        <ButtonAction
          handleClick={() => textToSpeech(entity.title)}
          icon={<SpeechIcon isSublist={false} />}
          title={"Voix"}
          isSublist={false}
          position="top"
          type="info"
        />
      )}
      {session.active && session.verified && updateDeleteCondition && (
        <LinkAction
          isSublist={false}
          href={`/dashboard/${entityName}/${entity.id}/update`}
          icon={<UpdateIcon isSublist={false} />}
          title={"Modifier"}
          position={"top"}
          type="info"
        />
      )}
      {session.active && session.verified && updateDeleteCondition && (
        <DeleteAction entity={entity} entityName={entityName} />
      )}
    </div>
  );
};

export default EntityHeaderActions;
