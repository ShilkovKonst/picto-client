import EntityList from "@/_components/dashboard/EntityList";
import { getAll, getAllAsList } from "@/_helpers/pictoApiHelper";
import React from "react";

const page = async ({ searchParams }) => {
  const data = await getAll(searchParams.page, searchParams.size);
  console.log("data", data);
  return <EntityList data={data ?? null} entityName="pictograms" />;
};

export default page;
