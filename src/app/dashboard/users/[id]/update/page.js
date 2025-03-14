import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_lib/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upn/EntityUpdate";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const user = await getOneById("users", params.id, accessToken);
  const institutions = await getAllAsList("institutions", accessToken);
  // const roles = await getAllAsList("roles", accessToken);

  return (
    <EntityUpdate
      entity={user}
      institutions={institutions}
      session={session}
      entityName="users"
    />
  );
};

export default page;
