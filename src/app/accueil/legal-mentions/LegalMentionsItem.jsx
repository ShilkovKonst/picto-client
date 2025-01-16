import Separator from "@/_components/shared/Separator";

const LegalMentionsItem = ({ title, subtitle, text }) => {
  return (
    <div className="z-10">
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-1 text-center font-bold">
          <p>{title}</p>
          <p>{subtitle}</p>
        </div>
        <div className="col-span-3">{text}</div>
      </div>
    </div>
  );
};

export default LegalMentionsItem;
