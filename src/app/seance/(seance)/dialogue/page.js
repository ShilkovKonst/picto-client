import { getAllAsList } from "@/_lib/entityApiUtil";
import Dialogue from "./Dialogue";

const page = async () => {
  const questions = await getAllAsList("questions", null);
  const categories = await getAllAsList("categories", null);
  const pictograms = await getAllAsList("pictograms", null);
    
  return (
    <Dialogue questions={questions} categories={categories} pictograms={pictograms} />
  );
};

export default page;
