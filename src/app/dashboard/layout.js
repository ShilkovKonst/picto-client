import DashboardContentList from "@/_components/dashboard/_layout/dashboardContentList";
import DashboardHeader from "@/_components/dashboard/_layout/dashboardHeader";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div
      className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] min-h-[90vh] bg-pform sm:rounded-xl
      overflow-hidden p-3 ml-auto mr-auto"
    >
      {/* <!-- logo of the site  with deconnexion button--> */}
      <DashboardHeader />
      <div className="flex flex-col md:flex-row items-start sm:p-4 h-5/6">
        {/* <!-- side bar with list of entities --> */}
        <DashboardContentList />
        <div className="relative w-full h-[95%] min-h-[50vh] flex flex-col justify-start overflow-visible mt-3 md:mt-0 md:ml-3 p-4 bg-[#ffffff80] shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
