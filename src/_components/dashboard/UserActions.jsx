import { RemoveIcon, UpdateProfileIcon } from "@/_components/icons";
import LinkButtonAction from "../shared/LinkAction";

const UserActions = ({ path1, path2 }) => {
  return (
    <div className="flex ml-3 flex-row items-center justify-evenly md:justify-end gap-3">
      <LinkButtonAction
        href={path1}
        icon={<UpdateProfileIcon />}
        isSublist={false}
        title={"Modifier"}
        position="top"
        type="info"
      />
      <LinkButtonAction
        href={path2}
        icon={<RemoveIcon />}
        isSublist={false}
        title={"Désactiver"}
        position="top"
        type="alert"
      />
    </div>
  );
};

export default UserActions;
