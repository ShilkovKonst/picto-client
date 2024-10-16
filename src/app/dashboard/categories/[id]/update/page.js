"use server";
import EntityUpdate from "@/_components/dashboard/EntityUpdate";
import getAccessToken from "@/_utils/cookieUtil";
import { getAllAsList, getOneById, getAllAsSimpleList } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const category = await getOneById("categories", params.id, accessToken);
  const categories = await getAllAsSimpleList("categories", accessToken);
  const questions = await getAllAsList("questions", accessToken);

  return (
    <EntityUpdate
      entity={category}
      entityName="categories"
      categories={categories}
      questions={questions}
    />
  );
};

export default page;

async function getOneCatById(id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: getAccessToken() ? `accessToken=${getAccessToken().value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

async function getSimpleCatList() {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories?asList=true&simple=true`,
    {
      method: "GET",
      headers: {
        Cookie: getAccessToken() ? `accessToken=${getAccessToken().value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

async function getQuestList() {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/questions?asList=true`,
    {
      method: "GET",
      headers: {
        Cookie: getAccessToken() ? `accessToken=${getAccessToken().value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
