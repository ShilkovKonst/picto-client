import Entity from "@/_components/dashboard/Entity";
import { getOneById } from "@/_helpers/tagApiHelper";
import React from "react";

const page = async ({ params }) => {
  const data = await getOneById(params.id);
  console.log(data);

  return <Entity entity={data ?? null} entityName="tags" />;
};

export default page;
