import Tag from "./Tag";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllByOtherAsList, getOneById } from "@/_lib/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const tag = await getOneById("tags", params.id, accessToken);
  tag?.status == 404 && notFound();
  const pictograms = await getAllByOtherAsList(
    "pictograms",
    "tag",
    params.id,
    accessToken
  );

  return <Tag tag={tag} pictograms={pictograms} />;
};

export default page;
