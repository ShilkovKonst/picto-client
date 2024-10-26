"use client";
import React, { Suspense, useEffect } from "react";
import DashboardHeader from "@/_components/dashboard/_layout/_dashboardHeader";
import DashboardContentList from "@/_components/dashboard/_layout/_dashboardContentList";

const DashboardLayout = ({ children, user }) => {  
  return (
    <div
      className="relative w-full md:w-[80%] lg:w-[70%] xl:w-[70%]  bg-pform md:rounded-xl
      overflow-hidden p-3 pb-20 ml-auto mr-auto"
    >
      {/* <!-- logo of the site  with deconnexion button--> */}
      <DashboardHeader user={user} />
      <div className="flex flex-col md:flex-row items-start sm:p-4 h-5/6">
        {/* <!-- side bar with list of entities --> */}
        <Suspense>
          <DashboardContentList user={user} />
        </Suspense>
        <div className="relative w-full h-[95%] min-h-[50vh] flex flex-col justify-start overflow-visible mt-3 md:mt-0 md:ml-3 p-4 pt-2 bg-[#ffffff80] shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
