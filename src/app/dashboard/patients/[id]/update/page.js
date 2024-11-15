import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_utils/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { jwtDecode } from "jwt-decode";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken.value);
  const patient = await getOneById("patients", params.id, accessToken);
  const users = await getAllAsList("users", accessToken);

  return (
    <EntityUpdate
      entity={patient}
      users={users}
      session={session}
      entityName="patients"
    />
  );
};

export default page;
