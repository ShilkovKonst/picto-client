import Pictogram from "./Pictogram";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const pictogram = await getOneById("pictograms", params.id, accessToken);

  return <Pictogram pictogram={pictogram} />;
};

export default page;
