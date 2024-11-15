import getAccessToken from "@/_utils/getAccessTokenUtil";
import User from "./User";
import { getOneById } from "@/_utils/entityApiUtil";
import { jwtDecode } from "jwt-decode";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
  const user = await getOneById("users", params.id, accessToken);
  
  return <User user={user} session={session} patients={user.patients} notes={user.notes} />;
};

export default page;
