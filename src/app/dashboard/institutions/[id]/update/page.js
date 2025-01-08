import EntityUpdate from "@/_components/dashboard/upn/EntityUpdate";
import { getOneById } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

const page = async props => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const institution = await getOneById("institutions", params.id, accessToken);

  return <EntityUpdate entity={institution} entityName={"institutions"} />;
};

export default page;
