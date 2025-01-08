import FooterLink from "./FooterLink";

const FooterApropos = () => {
  return (
    <>
      <div className="flex justify-center items-center font-bold text-sm gap-5">
        <FooterLink href={"/accueil/legal-mentions"} title={"Mentions légales"} />
        <FooterLink href={"/accueil/partners"} title={"Partenaires"} />
        <FooterLink href={"/accueil/apropos"} title={"A Propos"} />
      </div>
      <div className="flex justify-center items-center text-sm mt-1">
        <p>
          © Tous droits réservés - <span className="text-primary font-semibold">P</span>
          icto
          <span className="text-secondary font-semibold">P</span>icto® 2021
        </p>
      </div>
    </>
  );
};

export default FooterApropos;
