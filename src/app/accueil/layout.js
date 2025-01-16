import Image from "next/image";
import FooterLink from "@/_components/accueil/FooterLink";
import images from "@/_constants/images";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full lg:w-3/4 xl:w-2/3 min-h-svh md:min-h-0 h-full lg:h-[95%] bg-pform lg:rounded-xl overflow-hidden relative ml-auto mr-auto px-8">
      <HeaderImage width={240} />
      <Image
        src={images.logo}
        alt="LogoEcam.png"
        width={240}
        className="z-10 mx-auto p-5"
        priority={true}
      />
      {children}
      <div className="mx-auto my-5">
        <FooterLink href={"/"} title={"Retour à l'accueil"} />
      </div>
      <div className="absolute w-96 h-96 rounded-full -bottom-1/4 md:-bottom-1/2 lg:-bottom-1/4 -left-1/4 shadow-inset-8/12"></div>
      <div className="absolute w-96 h-96 rounded-full -top-1/3 left-3/4 shadow-inset-8/12"></div>
    </div>
  );
};

export default Layout;
