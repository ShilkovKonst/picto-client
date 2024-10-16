import Question from "./Question";
import getAccessToken from "@/_utils/cookieUtil";
import { getAllByOtherId, getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const question = await getOneById("questions", params.id, accessToken);
  const categories = await getAllByOtherId(
    "categories",
    "question",
    params.id,
    accessToken
  );

  return <Question question={question} categories={categories} />;
};

export default page;
