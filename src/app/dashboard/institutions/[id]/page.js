import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
import Institution from "./Institution";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const institution = await getOneById("institutions", params.id, accessToken);
  const users = institution.users;
  return <Institution institution={institution} users={users} />;
};

export default page;
