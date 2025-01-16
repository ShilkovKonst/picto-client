import Separator from "@/_components/_shared/Separator";

const InstitutionItem = ({ title, content }) => {
  return (
    <>
      <Separator />
      <div className="p-1">
        <p className="col-span-1 text-sm text-start font-semibold">{title}</p>
        <div className="col-span-4 text-start ml-2 flex justify-start items-center">
          {content}
        </div>
      </div>
    </>
  );
};

export default InstitutionItem;
