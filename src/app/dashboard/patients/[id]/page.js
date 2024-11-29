import getAccessToken from "@/_utils/getAccessTokenUtil";
import Patient from "./Patient";
import { getOneById } from "@/_utils/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const patient = await getOneById("patients", params.id, accessToken);
  patient?.status == 404 && notFound();

  return <Patient session={session} patient={patient} notes={patient.notes} />;
};

export default page;
