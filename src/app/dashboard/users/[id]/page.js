import getAccessToken from "@/_utils/getAccessTokenUtil";
import User from "./User";
import { getAllByOtherAsList, getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const user = await getOneById("users", params.id, accessToken);

  return <User user={user} patients={user.patients} notes={user.notes} />;
};

export default page;
