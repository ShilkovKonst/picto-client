import getAccessToken from "@/_lib/getAccessTokenUtil";
import Seance from "./Seance";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const { accessToken, session } = getAccessToken();
  const { user, patient } = searchParams;

  return <Seance user={user} patient={patient} />;
};

export default page;
