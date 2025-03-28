import getAccessToken from "@/_lib/getAccessTokenUtil";
import DashboardHeader from "@/_components/dashboard/DashboardHeader";
import DashboardContentList from "@/_components/dashboard/DashboardContentList";

export const metadata = {
  title: "Tableau de bord | PictoPicto",
  description: "Tableau de bord",
};

const Layout = ({ children }) => {
  const { session } = getAccessToken();
  return (
    <div className="relative h-screen w-full lg:w-[90%] xl:w-[80%] bg-pbg lg:rounded-xl p-3 ml-auto mr-auto">
      {/* <!-- logo of the site  with deconnexion button--> */}
      <DashboardHeader session={session} />
      <div className="flex flex-col md:flex-row items-start sm:pt-4">
        {/* <!-- side bar with list of entities --> */}
        <DashboardContentList session={session} />
        <section className="relative w-full dashboard overflow-y-auto h-[calc(100vh-13rem)] md:h-[calc(100vh-8rem)] flex flex-col justify-start mt-3 md:mt-0 md:ml-3 p-4 pt-2 bg-pform shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
