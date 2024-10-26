import EntityUpdate from "@/_components/dashboard/EntityUpdate";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsList, getAllAsSimpleList } from "@/_utils/entityApiUtil";

const page = async () => {
  const accessToken = getAccessToken();
  const categories = await getAllAsSimpleList("categories", accessToken);
  const tags = await getAllAsList("tags", accessToken);

  return (
    <EntityUpdate
      entity={null}
      entityName={"pictograms"}
      categories={categories}
      tags={tags}
    />
  );
};

export default page;
