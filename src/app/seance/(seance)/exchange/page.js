import { getAllAsList } from "@/_lib/entityApiUtil";
import Dialogue from "./Exchange";
import Exchange from "./Exchange";

const page = async () => {
  const questions = await getAllAsList("questions", null);
  const categories = await getAllAsList("categories", null);
  const pictograms = await getAllAsList("pictograms", null);
    
  return (
    <Exchange questions={questions} categories={categories} pictograms={pictograms}  />
  );
};

export default page;
