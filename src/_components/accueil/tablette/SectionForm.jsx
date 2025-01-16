import LoginForm from "@/_components/_forms/LoginForm";
import FooterLink from "../FooterLink";
import HeaderImage from "@/_components/shared/HeaderImage";

const SectionForm = () => {
  return (
    <div className="w-full px-10">
      <div className="flex justify-center items-center pt-5">
        <HeaderImage width={140} />
      </div>
      <LoginForm />
      <div className="flex justify-center items-center text-center text-sm mx-auto font-bold gap-2">
        <p>Pas encore de compte ?</p>
        <FooterLink href={"/accueil/signup"} title={"S'inscrire"} />
      </div>
    </div>
  );
};

export default SectionForm;
