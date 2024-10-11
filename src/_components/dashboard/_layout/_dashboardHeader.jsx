"use client";
import images from "@/_constants/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardHeader = () => {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/auth/signOut");
    if (response.status == 200) {
      console.log("response.status == 200", response.status)
      localStorage.removeItem("userData");
    } 
    router.push(`/`);
    router.refresh();    
  };

  return (
    <div className="flex flex-row justify-between items-center w-full sm:p-4">
      <Image
        src={images.logo}
        alt="LogoEcam.png"
        width={140}
        className="z-10 "
      />
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-col justify-end items-center text-end">
          <p className="ml-auto">Bienvenue,</p>
          <p className="font-semibold">
            {/* {{ app.user.firstName }} {{ app.user.lastName }} */}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="w-10 h-10 bg-pbg hover:bg-pred transition duration-300 ease-in-out rounded-full overflow-hidden"
        >
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
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
