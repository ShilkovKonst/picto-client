import EntityList from "@/_components/dashboard/EntityList";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ searchParams }) => {
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const data =
    searchParams.type == "supercategories"
      ? await getAllByType(accessToken, page, size, "supercategories")
      : searchParams.type == "subcategories"
      ? await getAllByType(accessToken, page, size, "subcategories")
      : await getAll(accessToken, page, size);

  return <EntityList data={data ?? []} entityName="categories" />;
};

export default page;

async function getAll(accessToken, page, size) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories?page=${page}&size=${size}`,
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

async function getAllByType(accessToken, page, size, type) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/categories?page=${page}&size=${size}&type=${type}`,
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
