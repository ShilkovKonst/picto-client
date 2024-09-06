import React from "react";
import { getOneById } from "@/_helpers/tagApiHelper";
import Tag from "./Tag";

const page = async ({ params }) => {
  const data = await getOneById(params.id);
  
  return <Tag tag={data ?? null} />;
};

export default page;
