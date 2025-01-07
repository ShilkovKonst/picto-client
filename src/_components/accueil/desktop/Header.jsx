import Image from "next/image";
import images from "@/_constants/images";

const Header = () => {
  return (
    <div className="grid grid-cols-5 *:p-4">
      <div className="col-span-2 flex justify-center items-center">
        <Image
          src={images.logo}
          alt="LogoEcam.png"
          width={140}
          className="z-10 "
          priority={true}
        />
      </div>
      <div className="col-span-3 flex justify-center items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-center">
          Bienvenue sur <span className="text-primary">P</span>icto
          <span className="text-secondary">P</span>icto!
        </h2>
      </div>
    </div>
  );
};

export default Header;
