import HeaderImage from "@/_components/shared/HeaderImage";

const Header = () => {
  return (
    <header className="grid grid-cols-5 *:p-4">
      <div className="col-span-2 flex flex-col justify-center items-center">
        <HeaderImage width={140} />
      </div>
      <div className="col-span-3 flex justify-center items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-center">
          Bienvenue sur <span className="text-primary">P</span>icto
          <span className="text-secondary">P</span>icto!
        </h2>
      </div>
    </header>
  );
};

export default Header;
