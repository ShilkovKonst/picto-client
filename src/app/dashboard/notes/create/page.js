import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { getAllAsList } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { jwtDecode } from "jwt-decode";

const page = async ({ searchParams }) => {
  const { user, patient } = searchParams;
  console.log(user, patient)
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
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
