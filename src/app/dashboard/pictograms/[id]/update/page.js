import EntityUpdate from "@/_components/dashboard/cqpUpdate/EntityUpdate";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import {
  getAllAsList,
  getAllAsSimpleList,
  getOneById,
} from "@/_lib/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
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
