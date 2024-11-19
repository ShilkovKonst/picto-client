import getAccessToken from "@/_utils/getAccessTokenUtil";
import Patient from "./Patient";
import { getOneById } from "@/_utils/entityApiUtil";
import { jwtDecode } from "jwt-decode";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
  const patient = await getOneById("patients", params.id, accessToken);

  return <Patient session={session} patient={patient} notes={patient.notes} />;
};

export default page;
