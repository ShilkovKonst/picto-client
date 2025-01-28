import Pictogram from "./Pictogram";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllByOtherAsList, getOneById } from "@/_lib/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const pictogram = await getOneById("pictograms", params.id, accessToken);
  pictogram?.status == 404 && notFound();
  const questions = await getAllByOtherAsList(
    "questions",
    "pictogram",
    params.id,
    accessToken
  );
  
  return (
    <Pictogram session={session} pictogram={pictogram} questions={questions} />
  );
};

export default page;
