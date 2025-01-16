import images from "@/_constants/images";
import Image from "next/image";

const HeaderImage = ({ width }) => {
  return (
    <Image
      src={images.logo}
      alt="LogoEcam.png"
      width={width}
      className="z-10 mx-auto"
      priority={true}
    />
  );
};

export default HeaderImage;
