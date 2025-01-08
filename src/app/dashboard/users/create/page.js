import EntityUpdate from "@/_components/dashboard/upn/EntityUpdate";
import { getAllAsList } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const institutions = await getAllAsList("institutions", accessToken);
  const roles = await getAllAsList("roles", accessToken);

  return (
    <EntityUpdate
      session={session}
      entity={null}
      institutions={institutions}
      roles={roles}
      entityName={"users"}
    />
  );
};

export default page;
