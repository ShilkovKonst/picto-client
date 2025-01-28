import getAccessToken from "@/_lib/getAccessTokenUtil";
import Category from "./Category";
import { getAllByOtherAsList, getOneById } from "@/_lib/entityApiUtil";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const category = await getOneById("categories", params.id, accessToken);
  category?.status == 404 && notFound();
  const pictograms = await getAllByOtherAsList(
    "pictograms",
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
      session={session}
      category={category}
      pictograms={pictograms.length > 0 ? pictograms : null}
      subcategories={subcategories.length > 0 ? subcategories : null}
    />
  );
};

export default page;
