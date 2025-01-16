import Separator from "@/_components/shared/Separator";

const PartnersItem = ({ type, names }) => {
  return (
    <>
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-2">
        <div className="col-span-2 text-center font-bold flex justify-center items-center">{type}</div>
        <div className="grid grid-cols-2 col-span-2">
          {names.map((name, i) => (
            <div className="col-span-2 " key={i}>
              <p className="py-2">{name}</p>
              {i < names.length -1 && <Separator n={2} isSimple={true} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PartnersItem;
