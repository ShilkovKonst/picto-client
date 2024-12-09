"use client";
import Image from "next/image";
import images from "@/_constants/images";
import { useRouter } from "next/navigation";

const DashboardHeader = ({ session }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/api/auth/signOut");
    if (response.status == 200) {
      console.log("response.status == 200", response.status);
    }
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
      />
      {session && (
        <div className="flex flex-row justify-between gap-3 items-center">
          <div className="flex flex-col justify-center items-center text-end">
            <p className="ml-auto">Bienvenue,</p>
            <p className="font-semibold">
              {session.job} {session.firstName} {session.lastName}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-10 h-10 bg-primary hover:bg-secondary transition duration-300 ease-in-out rounded-full overflow-hidden flex justify-center items-center"
          >
            <svg
              className="w-8 h-8 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
              />
            </svg>
            {/* 
            <svg
              className="w-10 h-10 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg> */}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
