import Category from "./Category";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import {
  getAllByOtherAsList,
  getOneById,
} from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const category = await getOneById("categories", params.id, accessToken);
  const pictograms = await getAllByOtherAsList(
    "pictograms",
    "category",
    params.id,
    accessToken
  );
  const questions = await getAllByOtherAsList(
    "questions",
    "category",
    params.id,
    accessToken
  );
  const subcategories = await getAllByOtherAsList(
    "categories",
    "supercategory",
    params.id,
    accessToken
  );

  return (
    <Category
      category={category}
      pictograms={pictograms.length > 0 ? pictograms : null}
      questions={questions.length > 0 ? questions : null}
      subcategories={subcategories.length > 0 ? subcategories : null}
    />
  );
};

export default page;
