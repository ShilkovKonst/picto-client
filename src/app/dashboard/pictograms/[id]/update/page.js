import EntityUpdate from "@/_components/dashboard/EntityUpdate";
import { getOneById } from "@/_helpers/pictoApiHelper";
import React from "react";

const page = async ({ params }) => {
  const pictogram = await getOneById(params.id);

  return <EntityUpdate entity={pictogram} entityName={"pictograms"} />;
};

export default page;
