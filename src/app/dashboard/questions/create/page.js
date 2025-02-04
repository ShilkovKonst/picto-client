import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import { getAllByOtherAsList } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const categories = await getAllByOtherAsList(
    "categories",
    "type",
    "supercategories",
    accessToken,
    true
  );
  
  return (
    <EntityUpdate
      entity={null}
      entityName="questions"
      categories={categories.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      )}
    />
  );
};

export default page;
