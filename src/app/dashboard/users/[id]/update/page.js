import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_utils/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { jwtDecode } from "jwt-decode";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
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
