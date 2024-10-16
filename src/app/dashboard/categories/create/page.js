import EntityUpdate from "@/_components/dashboard/EntityUpdate";
import getAccessToken from "@/_utils/cookieUtil";
import { getAllAsList, getAllAsSimpleList } from "@/_utils/entityApiUtil";

const page = async () => {
  const accessToken = getAccessToken();
  const categories = await getAllAsSimpleList("categories", accessToken);
  const questions = await getAllAsList("questions", accessToken);
  return (
    <EntityUpdate
      entity={null}
      entityName="categories"
      categories={categories}
      questions={questions}
    />
  );
};

export default page;
