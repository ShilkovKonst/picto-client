import Pictogram from "./Pictogram";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const pictogram = await getOneById("pictograms", params.id, accessToken);
  pictogram?.status == 404 && notFound();

  return <Pictogram pictogram={pictogram} />;
};

export default page;
