import LayoutNavModal from "./LayoutNavModal";
import LayoutNavModalButton from "./LayoutNavModalButton";

const LayoutNavButton = ({ session }) => {
  return (
    <div className="relative group">
      <LayoutNavModalButton />
      <LayoutNavModal session={session} />
    </div>
  );
};

export default LayoutNavButton;
