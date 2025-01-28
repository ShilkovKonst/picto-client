import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getOneById } from "@/_lib/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const question = await getOneById("questions", params.id, accessToken);
  const pictograms = await getAllAsSimpleList("pictograms", accessToken);

  return (
    <EntityUpdate
      session={session}
      entity={question}
      entityName="questions"
      pictograms={pictograms}
    />
  );
};

export default page;
