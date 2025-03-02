import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_lib/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upn/EntityUpdate";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const user = await getOneById("users", session.id, accessToken);
  const institutions = await getAllAsList("institutions", accessToken);

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
