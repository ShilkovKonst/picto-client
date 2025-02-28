import { getAllAsList, getAllByOtherAsList } from "@/_lib/entityApiUtil";
import Exchange from "./Exchange";

const page = async () => {
  const categories = await getAllByOtherAsList("categories", "type", "supercategories", null);

  return <Exchange categories={categories} />;
};

export default page;
