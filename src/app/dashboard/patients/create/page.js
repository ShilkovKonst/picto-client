import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { getAllAsList } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const users = await getAllAsList("users", accessToken);

  return (
    <EntityUpdate
      session={session}
      entity={null}
      users={users}
      entityName={"patients"}
    />
  );
};

export default page;
