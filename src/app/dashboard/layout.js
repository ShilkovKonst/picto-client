import { Suspense } from "react";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import DashboardHeader from "@/_components/_shared/blocks/DashboardHeader";
import DashboardContentList from "@/_components/_shared/molecules/DashboardContentList";

const Layout = ({ children }) => {
  const { accessToken, session } = getAccessToken();
  return (
    <div
      className="relative w-full md:w-[100%] lg:w-[90%] xl:w-[80%] bg-pbg md:rounded-xl p-3 md:pb-20 ml-auto mr-auto"
    >
      {/* <!-- logo of the site  with deconnexion button--> */}
      <DashboardHeader session={session} />
      <div className="flex flex-col md:flex-row items-start sm:p-4">
        {/* <!-- side bar with list of entities --> */}
        <Suspense>
          <DashboardContentList session={session} />
        </Suspense>
        <div className="xxx relative w-full min-h-[50vh] flex flex-col justify-start mt-3 md:mt-0 md:ml-3 p-4 pt-2 bg-pform shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
