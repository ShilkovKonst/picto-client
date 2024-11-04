import EntityUpdate from "@/_components/dashboard/cqpUpdate/EntityUpdate";
import getAccessToken from "@/_utils/getAccessTokenUtil";
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
