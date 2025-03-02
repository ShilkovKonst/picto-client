import { getAllByOtherAsList } from "@/_lib/entityApiUtil";
import SeanceBase from "@/_components/seance/SeanceBase";

const page = async () => {
  const categories = await getAllByOtherAsList("categories", "type", "supercategories", null);

  return <SeanceBase categories={categories} seanceType={"exchange"} />;
};

export default page;
