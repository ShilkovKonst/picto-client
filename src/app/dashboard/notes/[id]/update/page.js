import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getOneById } from "@/_utils/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { jwtDecode } from "jwt-decode";

const page = async props => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const note = await getOneById("notes", params.id, accessToken);
  const users = await getAllAsList("users", accessToken);
  const patients = await getAllAsList("patients", accessToken);

  return (
    <EntityUpdate
      entity={note}
      users={users}
      patients={patients}
      session={session}
      entityName="notes"
    />
  );
};

export default page;
