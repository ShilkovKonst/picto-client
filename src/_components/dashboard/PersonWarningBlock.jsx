import { WarningIcon } from "@/_components/icons";

const PersonWarningBlock = ({ position, title, type }) => {
  return (
    <div className="relative group">
      <WarningIcon />
    </div>
  );
};

export default PersonWarningBlock;
