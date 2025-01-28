import Question from "./Question";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllByOtherAsList, getOneById } from "@/_lib/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const question = await getOneById("questions", params.id, accessToken);
  question?.status == 404 && notFound();
  const pictograms = await getAllByOtherAsList(
    "pictograms",
    "question",
    params.id,
    accessToken
  );
  return <Question question={question} pictograms={pictograms} session={session} />;
};

export default page;
