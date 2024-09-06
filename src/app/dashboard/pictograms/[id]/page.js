import React from "react";
import { getOneById as getPictoById } from "@/_helpers/pictoApiHelper";
import { getOneById as getCategoryById } from "@/_helpers/categoryApiHelper";
import Pictogram from "./Pictogram";

const page = async ({ params }) => {
  const pictogram = await getPictoById(params.id);
  const category = await getCategoryById(pictogram.category);

  return (
    <Pictogram pictogram={pictogram ?? null} category={category ?? null} />
  );
};

export default page;
