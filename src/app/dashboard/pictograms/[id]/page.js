import Pictogram from "./Pictogram";
import getAccessToken from "@/_utils/cookieUtil";
import { getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const pictogram = await getOneById("pictograms", params.id, accessToken);
  const category = await getOneById(
    "categories",
    pictogram.category,
    accessToken
  );
  return <Pictogram pictogram={pictogram} category={category} />;
};

export default page;
