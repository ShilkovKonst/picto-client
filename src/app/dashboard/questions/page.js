import EntityList from "@/_components/dashboard/EntityList";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ searchParams }) => {
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const data = await getAllQuestions(page, size, accessToken);
  console.log(data);

  return <EntityList data={data ?? []} entityName="questions" />;
};

export default page;

async function getAllQuestions(page, size, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/questions?page=${page}&size=${size}`,
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