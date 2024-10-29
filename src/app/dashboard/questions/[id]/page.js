import Question from "./Question";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllByOtherAsList, getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const question = await getOneById("questions", params.id, accessToken);
  const categories = await getAllByOtherAsList(
    "categories",
    "question",
    params.id,
    accessToken
  );
  return <Question question={question} categories={categories} />;
};

export default page;
