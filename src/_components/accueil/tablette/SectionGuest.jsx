import GuestMode from "../GuestMode";
import FooterApropos from "../FooterApropos";


const SectionGuest = () => {
  return (
    <div className="px-10">
      <div className="flex justify-center items-center mb-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-center">
          Bienvenue sur <span className="text-primary">P</span>icto
          <span className="text-secondary">P</span>icto!
        </h2>
      </div>
      <GuestMode />
      <FooterApropos />
    </div>
  );
};

export default SectionGuest;
