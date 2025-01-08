import { BrainIcon, SpeechIcon, UpdateIcon } from "@/_components/icons";
import LinkAction from "../_shared/LinkAction";
import DeleteAction from "../_shared/DeleteAction";
import ButtonAction from "../_shared/ButtonAction";
import { textToSpeech } from "@/_lib/textToSpeechUtil";

const EntityHeaderActions = ({ session, entity, entityName }) => {
  const isAdmin = session.roles.includes("ROLE_ADMIN");
  const isSuperAdmin = session.roles.includes("ROLE_SUPERADMIN");
  const isNotSessionUser = entityName == "users" && entity?.id != session.id;
  const isSessionsInstitution =
    entityName == "users" && entity?.institution.id == session.institution.id;
  const isSessionsPatientOrNote =
    (entityName == "patients" || entityName == "notes") &&
    entity?.user?.id == session.id;
  const isSessionsInstitutionsPatientOrNote =
    (entityName == "patients" || entityName == "notes") &&
    entity?.user?.institution?.id == session.institution.id;
  const isNotInstitutionsOrUsersOrPatients =
    entityName != "institutions" &&
    entityName != "users" &&
    entityName != "patients";

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
      {session.active &&
        session.verified &&
        (isSuperAdmin ||
          isSessionsPatientOrNote ||
          (isSessionsInstitution && isAdmin) ||
          (isNotInstitutionsOrUsersOrPatients && isAdmin)) && (
          <LinkAction
            isSublist={false}
            href={`/dashboard/${entityName}/${entity.id}/update`}
            icon={<UpdateIcon isSublist={false} />}
            title={"Modifier"}
            position={"top"}
            type="info"
          />
        )}
      {session.active &&
        session.verified &&
        (isSuperAdmin ||
          isSessionsPatientOrNote ||
          (isSessionsInstitution && isAdmin) ||
          (isNotInstitutionsOrUsersOrPatients && isAdmin) ||
          (isSessionsInstitutionsPatientOrNote && isAdmin)) && (
          <DeleteAction entity={entity} entityName={entityName} />
        )}
    </div>
  );
};

export default EntityHeaderActions;
