import EntityList from "@/_components/dashboard/EntityList";
import { getAll, getAllAsList } from "@/_helpers/categoryApiHelper";
import React from "react";

const page = async () => {
  const data = await getAllAsList();
  console.log(data);

  return <EntityList data={data ?? null} entityName="categories" />;
};

export default page;
