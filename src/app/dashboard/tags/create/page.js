import EntityCreate from "@/_components/dashboard/EntityUpdate";
import { getAll } from "@/_helpers/tagApiHelper";
import React from "react";

const page = () => {
  return <EntityCreate entity={null} entityName="tags" />;
};

export default page;
