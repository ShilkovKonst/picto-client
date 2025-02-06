import HeaderImage from "../shared/HeaderImage";
import LayoutManagement from "./LayoutManagement";
import LayoutNavModal from "./LayoutNavModal";

const LayoutNav = ({ session }) => {
  return (
    <nav className="absolute right-0 top-0 bottom-0 h-screen w-24 bg-pform ">
      <div className="p-1 md:p-3">
        <HeaderImage width={240} />
      </div>
      <LayoutNavModal session={session} />
      <LayoutManagement />
    </nav>
  );
};

export default LayoutNav;
