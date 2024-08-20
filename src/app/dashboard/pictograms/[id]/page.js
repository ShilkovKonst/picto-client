import { getOneById as getPictoById } from "@/_helpers/pictoApiHelper";
import { getOneById as getCategoryById } from "@/_helpers/categoryApiHelper";
import React from "react";
import Pictogram from "@/_components/dashboard/pictograms/Pictogram";

const page = async ({ params }) => {
  const pictogram = await getPictoById(params.id);
  const category = await getCategoryById(pictogram.category);

  return (
    <Pictogram pictogram={pictogram ?? null} category={category ?? null} />
  );
};

export default page;
