import getAccessToken from "@/_lib/getAccessTokenUtil";
import User from "./User";
import { getOneById } from "@/_lib/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const user = await getOneById("users", params.id, accessToken);
  user?.status == 404 && notFound();
console.log(user.patients);
  return (
    <User
      user={user}
      session={session}
      patients={user.patients}
      notes={user.notes}
    />
  );
};

export default page;
