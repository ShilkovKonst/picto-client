import EntityList from "@/_components/dashboard/EntityList";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ searchParams }) => {
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const data = searchParams.type != "all"
    ? await getAllPictosByType(page, size, accessToken, searchParams.type)
    : await getAllPictos(page, size, accessToken);

  return <EntityList data={data && data?.content?.length > 0 ? data : []} entityName="pictograms" />;
};

export default page;

async function getAllPictos(page, size, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/pictograms?page=${page}&size=${size}`,
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
async function getAllPictosByType(page, size, accessToken, type) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/pictograms?page=${page}&size=${size}&type=${type}`,
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
