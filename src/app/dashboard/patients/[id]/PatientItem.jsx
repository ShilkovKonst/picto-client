import Separator from "@/_components/shared/Separator";

const PatientItem = ({ title, content }) => {
  return (
    <>
      <Separator />
      <div className="grid grid-cols-6 text-sm sm:text-base *:flex *:justify-start *:items-center">
        <p className="col-span-2 text-sm text-start font-semibold py-1">
          {title}
        </p>
        <p className="col-span-4 text-start ml-2 py-1">{content}</p>
      </div>
    </>
  );
};

export default PatientItem;
