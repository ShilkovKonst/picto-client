import React from "react";
import DashboardLayout from "./DashboardLayout";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { jwtDecode } from "jwt-decode";

const Layout = ({ children, searchParams }) => {
  const accessToken = getAccessToken();
  const session = accessToken && jwtDecode(accessToken.value);

  return (
    <DashboardLayout children={children} params={searchParams} session={session} />
  );
};

export default Layout;
