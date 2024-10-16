import EntityUpdate from "@/_components/dashboard/EntityUpdate";
import getAccessToken from "@/_utils/cookieUtil";
import {
  getAllAsList,
  getAllAsSimpleList,
  getOneById,
} from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const pictogram = await getOneById("pictograms", params.id, accessToken);
  const categories = await getAllAsSimpleList("categories", accessToken);
  const tags = await getAllAsList("tags", accessToken);

  return (
    <EntityUpdate
      entity={pictogram}
      entityName={"pictograms"}
      categories={categories}
      tags={tags}
    />
  );
};

export default page;
