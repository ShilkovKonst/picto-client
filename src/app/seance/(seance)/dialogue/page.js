import { getAllAsList } from "@/_lib/entityApiUtil";
import SeanceBase from "@/_components/seance/SeanceBase";

const page = async () => {
  const questions = await getAllAsList("questions", null);
    
  return (
    <SeanceBase questions={questions} seanceType={"dialogue"} />
  );
};

export default page;
