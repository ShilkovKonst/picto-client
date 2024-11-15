import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
import Institution from "./Institution";
import { jwtDecode } from "jwt-decode";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken.value);
  const institution = await getOneById("institutions", params.id, accessToken);
  const users = institution.users;
  return <Institution institution={institution} session={session} users={users} />;
};

export default page;
