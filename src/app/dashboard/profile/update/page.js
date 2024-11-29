import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_utils/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const user = await getOneById("users", session.id, accessToken);
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
