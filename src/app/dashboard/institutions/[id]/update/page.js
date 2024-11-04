import EntityUpdate from "@/_components/dashboard/upnUpdate/EntityUpdate";
import { getOneById } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const institution = await getOneById("institutions", params.id, accessToken);

  return <EntityUpdate entity={institution} entityName={"institutions"} />;
};

export default page;
