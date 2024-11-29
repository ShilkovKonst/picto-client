import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { getAllAsList } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const institutions = await getAllAsList("institutions", accessToken);
  const roles = await getAllAsList("roles", accessToken);

  return (
    <EntityUpdate
      entity={null}
      institutions={institutions}
      roles={roles}
      entityName={"users"}
    />
  );
};

export default page;
