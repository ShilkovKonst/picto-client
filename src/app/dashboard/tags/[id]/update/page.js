import EntityUpdate from "@/_components/dashboard/cqpUpdate/EntityUpdate";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const tag = await getOneById("tags", params.id, accessToken);

  return <EntityUpdate entity={tag} entityName="tags" />;
};

export default page;
