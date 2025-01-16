import Separator from "@/_components/shared/Separator";

const NoteItem = ({title, content}) => {
  return (
    <>
      <Separator />
      <div className="*:flex *:justify-start">
        <p className="items-center col-span-2 text-sm text-start font-semibold py-1">
          {title}
        </p>
        <div className="inline col-span-4 text-start ml-2 py-1 flex-col">
          {content}
        </div>
      </div>
    </>
  );
};

export default NoteItem;
