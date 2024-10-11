import EntityList from "@/_components/dashboard/EntityList";
import { getAll } from "@/_helpers/tagApiHelper";
import React from "react";

const page = async ({ searchParams }) => {
  const data = await getAll(searchParams.page ?? 0, searchParams.size ?? 5);
  console.log(data);

  return <EntityList data={data ?? []} entityName="tags" />;
};

export default page;
