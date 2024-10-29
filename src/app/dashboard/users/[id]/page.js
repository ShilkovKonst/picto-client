import getAccessToken from "@/_utils/getAccessTokenUtil";
import User from "./User";
import { getAllByOtherAsList, getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const user = await getOneById("users", params.id, accessToken);
  const patients = await getAllByOtherAsList(
    "patients",
    "user",
    params.id,
    accessToken
  );
  const notes = await getAllByOtherAsList(
    "notes",
    "user",
    params.id,
    accessToken
  );

  return <User user={user} patients={patients} notes={notes} />;
};

export default page;
