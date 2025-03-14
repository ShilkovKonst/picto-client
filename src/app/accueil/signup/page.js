import React from "react";
import SignUp from "./SignUp";
import { getAllAsSimpleListForSignUp } from "@/_lib/entityApiUtil";

const page = async () => {
  const institutions = await getAllAsSimpleListForSignUp("institutions");
  return <SignUp institutions={institutions ?? []} />;
};

export default page;
