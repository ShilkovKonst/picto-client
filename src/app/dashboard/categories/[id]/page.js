import React from "react";
import Category from "./Category";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const category = await getOneCatById(accessToken, params.id);
  const pictograms = await getAllPictoByCategoryId(accessToken, params.id);
  const questions = await getAllQuestionsByCategoryId(accessToken, params.id);
  const subcategories = await getAllSubcatsBySupercategoryId(accessToken, params.id);
  const supercategory = category.supercategory
    ? await getOneCatById(accessToken, category.supercategory)
    : null;

  return (
    <Category
      category={category}
      pictograms={pictograms.length > 0 ? pictograms : null}
      questions={questions.length > 0 ? questions : null}
      subcategories={subcategories.length > 0 ? subcategories : null}
      supercategory={supercategory}
    />
  );
};

export default page;

async function getOneCatById(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories/${id}`,
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

async function getAllPictoByCategoryId(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/pictograms/category/${id}`,
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

async function getAllQuestionsByCategoryId(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/questions/category/${id}`,
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

async function getAllSubcatsBySupercategoryId(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories/${id}/subcategories`,
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