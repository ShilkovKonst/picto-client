import getAccessToken from "@/_lib/getAccessTokenUtil";
import Seance from "./Seance";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const { accessToken, session } = getAccessToken();
  const { patient } = searchParams;

  return <Seance session={session} patient={session ? patient : null} />;
};

export default page;
