import SeanceAction from "../shared/SeanceAction";
import { FaListUl } from "react-icons/fa6";
import Separator from "../shared/Separator";
import LayoutNavModal from "./LayoutNavModal";

const LayoutNavButton = ({ handleClick, isOpen }) => {
  return (
    <div className="relative group">
      <button className={`w-full`}>
        <Separator />
        <div
          className={`flex flex-col justify-center items-center h-10 text-primary hover:text-secondary transition ease-in-out duration-300`}
        >
          <FaListUl size={"2rem"} />
        </div>
        <Separator />
      </button>
      <div
        className={`w-0 opacity-0 group-hover:opacity-100 group-hover:w-72 block absolute right-full top-0 bg-pform rounded-l-lg overflow-hidden transition-all ease-in-out duration-300`}
      >
        <Separator />
        <LayoutNavModal isOpen={isOpen} />
        <Separator />
      </div>
    </div>
  );
};

export default LayoutNavButton;
{
  /* <div className="relative">
  <button onClick={handleClick} className={`w-full`}>
    <Separator />
    <div
      className={`flex flex-col justify-center items-center h-10 ${
        isOpen ? "text-secondary" : "text-primary"
      } hover:text-secondary transition ease-in-out duration-300`}
    >
      <FaListUl size={"2rem"} />
    </div>
    <Separator />
  </button>
  <div
    className={`${
      isOpen ? "block" : "hidden"
    } absolute right-full top-0 bg-pform rounded-l-lg overflow-hidden`}
  >
    <Separator />
    <LayoutNavModal isOpen={isOpen} />
    <Separator />
  </div>
</div>; */
}
