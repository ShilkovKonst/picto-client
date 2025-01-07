import { BrainIcon, SpeechIcon, UpdateIcon } from "@/_components/icons";
import LinkButtonAction from "../atoms/LinkButtonAction";
import DeleteAction from "./DeleteAction";
import ButtonButtonAction from "../atoms/ButtonButtonAction";
import { textToSpeech } from "@/_lib/textToSpeechUtil";

const EntityHeaderActions = ({ session, entity, entityName }) => {
  return (
    <div className="flex ml-3 flex-row items-center justify-evenly md:justify-end gap-3">
      {session.active &&
        session.verified &&
        entityName == "patients" &&
        entity.active && (
          <LinkButtonAction
            isSublist={false}
            href={`/seance?patient=${entity.id}`}
            icon={<BrainIcon isSublist={false} />}
            title={"Lancer une séance"}
            position={"top"}
            type="info"
          />
        )}
      {(entityName == "pictograms" || entityName == "categories") && (
        <ButtonButtonAction
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
        (session.roles.includes("ROLE_ADMIN") ||
          (entityName == "users" && entity?.id != session.id) ||
          ((entityName == "patients" || entityName == "notes") &&
            entity?.user?.id == session.id)) && (
          <LinkButtonAction
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
        session?.roles?.includes("ROLE_SUPERADMIN") && (
          <DeleteAction entity={entity} entityName={entityName} />
        )}
    </div>
  );
};

export default EntityHeaderActions;
