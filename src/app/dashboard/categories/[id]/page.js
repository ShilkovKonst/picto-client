import Category from "./Category";
import getAccessToken from "@/_utils/cookieUtil";
import {
  getAllByOtherId,
  getAllSubEntitiesBySuperEntityId,
  getOneById,
} from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const category = await getOneById("categories", params.id, accessToken);
  const pictograms = await getAllByOtherId(
    "pictograms",
    "category",
    params.id,
    accessToken
  );
  const questions = await getAllByOtherId(
    "questions",
    "category",
    params.id,
    accessToken
  );
  const subcategories = await getAllSubEntitiesBySuperEntityId(
    "categories",
    params.id,
    accessToken
  );
  const supercategory = category.supercategory
    ? await getOneById("categories", category.supercategory, accessToken)
    : null;

  return (
    <Category
      category={category}
      pictograms={pictograms.length > 0 ? pictograms : null}
      questions={questions.length > 0 ? questions : null}
      subcategories={subcategories.length > 0 ? subcategories : null}
      supercategory={supercategory}
    />
  );
};

export default page;
