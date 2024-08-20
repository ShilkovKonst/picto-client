import EntityList from "@/_components/dashboard/EntityList";
import { getAll } from "@/_helpers/tagApiHelper";
import React from "react";

const page = async () => {
  const data = await getAll();
  console.log(data);

  return <EntityList data={data ?? null} entityName="tags" />;
};

export default page;
