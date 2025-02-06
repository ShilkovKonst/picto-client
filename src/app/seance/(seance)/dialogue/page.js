import { getAllAsList } from "@/_lib/entityApiUtil";
import Dialogue from "./Dialogue";

const page = async () => {
  const questions = await getAllAsList("questions", null);
    
  return (
    <Dialogue questions={questions} />
  );
};

export default page;
