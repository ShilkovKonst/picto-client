import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
import Institution from "./Institution";
import { notFound } from "next/navigation";

const page = async props => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const institution = await getOneById("institutions", params.id, accessToken);
  institution?.status == 404 && notFound();
  const users = institution.users;
  return <Institution institution={institution} session={session} users={users} />;
};

export default page;
