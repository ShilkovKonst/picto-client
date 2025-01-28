import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import { getAllAsList, getAllAsSimpleList } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const pictograms = await getAllAsSimpleList("pictograms", accessToken);

  return (
    <EntityUpdate
      entity={null}
      entityName="questions"
      pictograms={pictograms}
    />
  );
};

export default page;
