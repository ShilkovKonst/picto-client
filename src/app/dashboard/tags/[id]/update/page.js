import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getOneById } from "@/_lib/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const tag = await getOneById("tags", params.id, accessToken);

  return <EntityUpdate session={session} entity={tag} entityName="tags" />;
};

export default page;
