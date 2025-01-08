import Separator from "@/_components/_shared/Separator";

const AproposItem = ({ title, name }) => {
  return (
    <>
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-2 text-center font-bold">{title}</div>
        <div className="col-span-2">{name}</div>
      </div>
    </>
  );
};

export default AproposItem;
