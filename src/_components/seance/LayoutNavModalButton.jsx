import { FaListUl } from "react-icons/fa6";
import Separator from "../shared/Separator";

const LayoutNavModalButton = ({ isOpen, setIsOpen }) => {
  return (
    <button
      title="Menu"
      onClick={() => setIsOpen(!isOpen)}
      className={`text-primary hover:text-secondary w-full`}
    >
      <Separator />
      <div
        className={`flex flex-col justify-center items-center h-10 transition ease-in-out duration-300`}
      >
        <FaListUl size={"2rem"} />
      </div>
      <Separator />
    </button>
  );
};

export default LayoutNavModalButton;
