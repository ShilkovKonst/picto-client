import React from "react";
import Tag from "./Tag";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const dataTag = await getOneById(accessToken, params.id);
  const dataPictos = await getAllPictosByTagId(accessToken, params.id);
  
  return <Tag tag={dataTag} pictograms={dataPictos} />;
};

export default page;

async function getOneById(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/tags/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken?.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

async function getAllPictosByTagId(accessToken, id) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/pictograms/tag/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken?.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}