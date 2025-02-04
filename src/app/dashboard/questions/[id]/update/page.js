import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllByOtherAsList, getOneById } from "@/_lib/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const question = await getOneById("questions", params.id, accessToken);
  const categories = await getAllByOtherAsList(
    "categories",
    "type",
    "supercategories",
    accessToken,
    true
  );
  
  return (
    <EntityUpdate
      session={session}
      entity={question}
      entityName="questions"
      categories={categories.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      )}
    />
  );
};

export default page;
