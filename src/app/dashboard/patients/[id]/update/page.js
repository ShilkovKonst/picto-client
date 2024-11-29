import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_utils/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
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
