import Image from "next/image";
import images from "@/_constants/images";
import LoginForm from "@/_components/_forms/LoginForm";
import Footer from "../desktop/Footer";
import FooterLink from "../FooterLink";

const SectionForm = () => {
  return (
    <div className="w-full px-10">
      <div className="flex justify-center items-center pt-5">
        <Image
          src={images.logo}
          alt="LogoEcam.png"
          width={140}
          className="z-10 "
          priority={true}
        />
      </div>
      <LoginForm />
      <div className="flex justify-center items-center text-center text-sm mx-auto font-bold gap-2">
        <p>Pas encore de compte ?</p>
        <FooterLink href={"/signup"} title={"S'inscrire"} />
      </div>
    </div>
  );
};

export default SectionForm;
