import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllAsList, getAllAsSimpleList } from "@/_lib/entityApiUtil";
import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const categories = await getAllAsSimpleList("categories", accessToken);
  
  return (
    <EntityUpdate
      session={session}
      entity={null}
      entityName="categories"
      categories={categories}
    />
  );
};

export default page;
