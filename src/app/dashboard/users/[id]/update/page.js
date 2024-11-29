import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_utils/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const user = await getOneById("users", params.id, accessToken);
  const institutions = await getAllAsList("institutions", accessToken);
  const roles = await getAllAsList("roles", accessToken);

  return (
    <EntityUpdate
      entity={user}
      institutions={institutions}
      roles={roles}
      session={session}
      entityName="users"
    />
  );
};

export default page;
