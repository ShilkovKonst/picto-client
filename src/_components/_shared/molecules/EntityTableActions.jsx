"use client";
import { BrainIcon, SpeechIcon, UpdateIcon } from "@/_components/icons";
import DeleteAction from "./DeleteAction";
import LinkButtonAction from "../atoms/LinkButtonAction";
import ButtonButtonAction from "../atoms/ButtonButtonAction";
import { textToSpeech } from "@/_lib/textToSpeechUtil";

const EntityTableActions = ({ session, entity, entityName, isSublist }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-evenly gap-3 mt-2">
        {session.active &&
          session.verified &&
          entityName == "patients" &&
          entity.active && (
            <LinkButtonAction
              isSublist={false}
              href={`/seance?patient=${entity.id}`}
              icon={<BrainIcon isSublist={true} />}
              title={"Lancer une séance"}
              position={"top"}
              type="info"
            />
          )}
        {(entityName == "pictograms" || entityName == "categories") && (
          <ButtonButtonAction
            handleClick={() => textToSpeech(entity.title)}
            icon={<SpeechIcon isSublist={isSublist} />}
            title={"Voix"}
            isSublist={isSublist}
            position={"top"}
            type="info"
          />
        )}
        {session.active && session.verified && (session.roles.includes("ROLE_ADMIN") ||
          (entityName == "users" && entity?.id != session.id) ||
          ((entityName == "patients" || entityName == "notes") &&
            entity?.user?.id == session.id)) && (
          <LinkButtonAction
            isSublist={isSublist}
            href={`/dashboard/${entityName}/${entity.id}/update`}
            icon={<UpdateIcon isSublist={isSublist} />}
            title={"Modifier"}
            position={"top"}
            type="info"
          />
        )}
        {session.active && session.verified && session.roles.includes("ROLE_SUPERADMIN") && (
          <DeleteAction
            entity={entity}
            entityName={entityName}
            isSublist={isSublist}
          />
        )}
      </div>
    </>
  );
};

export default EntityTableActions;
