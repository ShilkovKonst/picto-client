import Separator from "@/_components/shared/Separator";

const CategoryItem = ({ title, content }) => {
  return (
    <>
      <Separator />
      <div className="p-1">
        <div className="text-start col-span-1 flex items-center font-semibold">
          {title}
        </div>
        <div className="text-start col-span-2 flex justify-start items-center">{content}</div>
      </div>
    </>
  );
};

export default CategoryItem;
