import React from "react";
import SignUp from "./SignUp";
import { getAllAsSimpleList } from "@/_utils/entityApiUtil";

const page = async () => {
  const institutions = await getAllAsSimpleList("institutions");

  return <SignUp institutions={institutions} />;
};

export default page;
