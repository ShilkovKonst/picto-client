import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { getAllAsList } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

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
