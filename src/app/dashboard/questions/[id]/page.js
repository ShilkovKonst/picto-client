import React from "react";
import Question from "./Question";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const question = await getOneQuestById(accessToken, params.id);
  const categories = await getAllCatsByQuestionId(accessToken, params.id);

  return (
    <Question
      question={question ?? null}
      categories={categories ?? null}
    />
  );
};

export default page;

async function getOneQuestById(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/questions/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

async function getAllCatsByQuestionId(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories/question/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}