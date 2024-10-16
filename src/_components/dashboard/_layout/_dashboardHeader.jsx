"use client";
import images from "@/_constants/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleClick = async () => {
    const response = await fetch("/api/auth/signOut");
    if (response.status == 200) {
      console.log("response.status == 200", response.status);
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
      {user && (
        <div className="flex flex-row justify-between gap-3 items-center">
          <div className="flex flex-col justify-center items-center text-end">
            <p className="ml-auto">Bienvenue,</p>
            <p className="font-semibold">
              {user.job} {user.firstName} {user.lastName}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="w-10 h-10 bg-pbg hover:bg-pred transition duration-300 ease-in-out rounded-full overflow-hidden flex justify-center items-center"
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
