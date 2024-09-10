import React from "react";
import DashboardLayout from "./DashboardLayout";

const Layout = ({ children, searchParams }) => {
  return (
    <DashboardLayout children={children} params={searchParams} />
  );
};

export default Layout;
