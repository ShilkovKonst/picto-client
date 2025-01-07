import { WarningIcon } from "@/_components/icons";
import ButtonTooltip from "./ButtonTooltip";

const PersonWarningBlock = ({ position, title, type }) => {
  return (
    <div className="relative group">
      <WarningIcon />
      <ButtonTooltip
        position={position}
        title={title}
        type={type}
      />
    </div>
  );
};

export default PersonWarningBlock;
