import FooterLink from "./FooterLink";

const FooterApropos = () => {
  return (
    <>
      <div className="flex justify-center items-center font-bold text-sm gap-5">
        <FooterLink href={"/legal-mentions"} title={"Mentions légales"} />
        <FooterLink href={"/partners"} title={"Partenaires"} />
        <FooterLink href={"/apropos"} title={"A Propos"} />
      </div>
      <div className="flex justify-center items-center text-sm mt-1">
        <p>
          © Tous droits réservés - <span className="text-primary">P</span>
          icto
          <span className="text-secondary">P</span>icto® 2021
        </p>
      </div>
    </>
  );
};

export default FooterApropos;
