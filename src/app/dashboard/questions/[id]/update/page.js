import EntityUpdate from "@/_components/dashboard/cqpUpdate/EntityUpdate";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const question = await getOneById("questions", params.id, accessToken);

  return <EntityUpdate entity={question} entityName="questions" />;
};

export default page;
