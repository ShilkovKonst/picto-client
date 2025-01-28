import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllAsList, getAllAsSimpleList } from "@/_lib/entityApiUtil";

const page = async () => {
  const { accessToken, session } = getAccessToken();
  const categories = await getAllAsSimpleList("categories", accessToken);
  const tags = await getAllAsList("tags", accessToken);
  const questions = await getAllAsList("questions", accessToken);

  return (
    <EntityUpdate
      session={session}
      entity={null}
      entityName={"pictograms"}
      categories={categories}
      tags={tags}
      questions={questions}
    />
  );
};

export default page;
