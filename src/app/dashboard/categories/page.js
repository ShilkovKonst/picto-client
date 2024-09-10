import EntityList from "@/_components/dashboard/EntityList";
import {
  getAll,
  getAllAsList,
  getAllSub,
  getAllSuper,
} from "@/_helpers/categoryApiHelper";
import React from "react";

const page = async ({ searchParams }) => {
  // const data = await getAllAsList();
  const page =
    searchParams.type == "supercategories"
      ? await getAllSuper(searchParams.page ?? 0, searchParams.size ?? 5)
      : searchParams.type == "subcategories"
      ? await getAllSub(searchParams.page ?? 0, searchParams.size ?? 5)
      : await getAll(searchParams.page ?? 0, searchParams.size ?? 5);

      console.log(page.content.length)
  return <EntityList data={page ?? null} entityName="categories" />;
};

export default page;
