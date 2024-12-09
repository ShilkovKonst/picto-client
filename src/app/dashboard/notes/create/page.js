import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { getAllAsList } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

const page = async props => {
  const { accessToken, session } = getAccessToken();
  const searchParams = await props.searchParams;
  const { user, patient } = searchParams;
  const users = await getAllAsList("users", accessToken);
  const patients = await getAllAsList("patients", accessToken);

  return (
    <EntityUpdate
      session={session}
      entity={null}
      users={users}
      patients={patients}
      patient={patient}
      entityName={"notes"}
    />
  );
};

export default page;
