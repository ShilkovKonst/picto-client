"use server";
import EntityUpdate from "@/_components/dashboard/EntityUpdate";
import { getOneById } from "@/_helpers/categoryApiHelper";
import React from "react";

const page = async ({ params }) => {
  const category = await getOneById(params.id);

  return <EntityUpdate entity={category ?? null} entityName="categories" />;
};

export default page;
