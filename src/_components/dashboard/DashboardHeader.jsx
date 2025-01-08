"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import images from "@/_constants/images";
import DashboardWelcomeBlock from "@/_components/dashboard/DashboardWelcomeBlock";

const DashboardHeader = ({ session }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/api/auth/signOut");
    router.push(`/`);
    router.refresh();
  };

  return (
    <div className="flex flex-row justify-between items-center w-full sm:p-4">
      <Image
        src={images.logo}
        alt="LogoEcam2.png"
        width={140}
        className="z-10 "
        priority={true}
      />
      {session && (
        <DashboardWelcomeBlock session={session} handleSignOut={handleSignOut} />
      )}
    </div>
  );
};

export default DashboardHeader;
