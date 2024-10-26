import EntityUpdate from '@/_components/dashboard/EntityUpdate';
import getAccessToken from '@/_utils/getAccessTokenUtil';
import { getOneById } from '@/_utils/entityApiUtil';

const page = async ({params}) => {
  const accessToken = getAccessToken();
  const question = await getOneById("questions", params.id, accessToken);

  return <EntityUpdate entity={question} entityName="questions" />;
}

export default page