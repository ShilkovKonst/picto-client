import Separator from "@/_components/shared/Separator";

const PictogramItem = ({ title, cls, content }) => {
  return (
    <>
      <Separator />
      <div className="p-1">
        <div className="text-start col-span-1 flex items-center font-semibold capitalize">{title}</div>
        <div className={`text-start col-span-2 flex flex-wrap justify-start items-center gap-3 ${cls}`}>{content}</div>
      </div>
    </>
  );
};

export default PictogramItem;
