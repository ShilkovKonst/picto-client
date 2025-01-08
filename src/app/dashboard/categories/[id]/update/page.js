"use server";
import EntityUpdate from "@/_components/dashboard/cqp/EntityUpdate";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import {
  getAllAsList,
  getOneById,
  getAllAsSimpleList,
} from "@/_lib/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const category = await getOneById("categories", params.id, accessToken);
  const categories = await getAllAsSimpleList("categories", accessToken);
  const questions = await getAllAsList("questions", accessToken);

  return (
    <EntityUpdate
      session={session}
      entity={category}
      entityName="categories"
      categories={categories}
      questions={questions}
    />
  );
};

export default page;
