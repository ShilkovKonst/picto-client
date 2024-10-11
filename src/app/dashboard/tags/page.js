import EntityList from "@/_components/dashboard/EntityList";
import { getAll } from "@/_helpers/tagApiHelper";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ searchParams }) => {
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const data = await getAllTags(page, size, accessToken);

  return <EntityList data={data ?? []} entityName="tags" />;
};

export default page;

async function getAllTags(page, size, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/tags?page=${page}&size=${size}`,
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