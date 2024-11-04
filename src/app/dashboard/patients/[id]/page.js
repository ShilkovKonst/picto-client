import getAccessToken from "@/_utils/getAccessTokenUtil";
import Patient from "./Patient";
import { getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const patient = await getOneById("patients", params.id, accessToken);
  
  return <Patient patient={patient} notes={patient.notes} />;
};

export default page;
