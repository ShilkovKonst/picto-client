import LayoutNav from "@/_components/seance/LayoutNav";
import getAccessToken from "@/_lib/getAccessTokenUtil";

export const metadata = {
  title: "Séance | PictoPicto",
  description: "Tableau de bord",
};

const Layout = ({ children }) => {
  const { session } = getAccessToken();
  return (
    <main className="relative w-full h-screen">
      <section className="w-[calc(100%-6rem)] p-3">{children}</section>
      <LayoutNav session={session} />
    </main>
  );
};

export default Layout;
