import FooterLink from "../FooterLink";
import FooterApropos from "../FooterApropos";

const Footer = () => {
  return (
    <footer className="grid grid-cols-5 *:p-4">
      <div className="col-span-2 flex justify-center items-center">
        <div className="flex justify-center items-center text-center text-sm mx-auto font-bold gap-2">
          <p>Pas encore de compte ?</p>
          <FooterLink href={"/accueil/signup"} title={"S'inscrire"} />
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center">
        <FooterApropos />
      </div>
    </footer>
  );
};

export default Footer;
