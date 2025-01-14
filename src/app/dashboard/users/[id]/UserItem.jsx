import Separator from "@/_components/_shared/Separator";

const UserItem = ({ title, content }) => {
  return (
    <>
      <Separator />
      <div className="grid grid-cols-5 text-sm sm:text-base *:flex *:justify-start *:items-center">
        <div className="col-span-1 text-sm text-start font-semibold py-1">
          {title}
        </div>
        <div className="col-span-4 text-start ml-2 py-1 flex-wrap gap-1">{content}</div>
      </div>
    </>
  );
};

export default UserItem;
