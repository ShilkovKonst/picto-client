"use client";
import UserActions from "./userActions";
import WarningIcon from "@/_components/icons/warningIcon";
import SuccessIcon from "@/_components/icons/successIcon";
import { Spinner } from "flowbite-react";

const UserProfile = ({ user }) => {
  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/verify/send-email`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`${errorDetails.message}`);
      } 
      console.log(response)
      return response.json();
    } catch (error) {
      console.error("Bad credentials:", error.message);
    }
  };

  return (
    <table className="table w-full">
      <thead>
        <tr className=" border-b w-auto">
          <th className="text-lg flex justify-center items-center">
            <span className="font-bold mx-auto flex justify-center items-center gap-3 relative group">
              Profil
              {user?.active ? (
                <>
                  <SuccessIcon />
                  <div className="hidden group-hover:block absolute top-6 -right-16 w-52 rounded-lg alert-success p-4">
                    <p className="font-normal text-sm text-green-800">
                      Votre compte est actif.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <WarningIcon />
                  <div className="hidden group-hover:block absolute top-6 -right-16 w-52 rounded-lg alert-danger p-4">
                    <p className="font-normal text-sm text-red-800">
                      Votre compte est inactif.
                    </p>
                  </div>
                </>
              )}
            </span>
            {user?.active && (
              <UserActions
                path1="/dashboard/profile/update"
                path2="/dashboard/profile/desactivate"
              />
            )}
          </th>
        </tr>
      </thead>
      <tbody className="flex flex-col gap-2 w-full">
        {!user && (
          <tr className="h-[205px] flex justify-center items-center">
            <th className="text-start w-[40%] lg:w-[20%]">
              <Spinner className="" size="xl" aria-label="Loading profile..." />
            </th>
          </tr>
        )}
        {user && (
          <>
            <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
              <th className="text-start w-[40%] lg:w-[20%]">Nom</th>
              <td className="text-start w-[45%] lg:w-[30%]">
                {user?.lastName}
              </td>
              <th className="text-start w-[40%] lg:w-[20%]">Prénom</th>
              <td className="text-start w-[45%] lg:w-[30%]">
                {user?.firstName}
              </td>
            </tr>
            <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
              <th className="text-start w-[40%] lg:w-[20%]">Fonction</th>
              <td className="text-start w-[45%] lg:w-[30%]">{user?.job}</td>
              <th className="text-start w-[40%] lg:w-[20%]">Institution</th>
              <td className="text-start w-[45%] lg:w-[30%]">
                {user?.institution?.title}
              </td>
            </tr>
            <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
              <th className="text-start w-[20%] lg:w-[15%]">Email</th>
              <td className="text-start flex items-center w-[75%] lg:w-[55%]">
                {user?.sub}
                <div className="relative group text-center w-auto ml-1">
                  {user?.verified ? (
                    <>
                      <SuccessIcon />
                      <div className="hidden group-hover:block absolute bottom-6 -right-36 w-72 rounded-lg alert-success p-4">
                        <p className="text-green-800">
                          Votre email est vérifié.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <WarningIcon />
                      <div className="hidden group-hover:block absolute bottom-6 -right-36 w-72 rounded-lg alert-danger p-4">
                        <p className="text-red-800">
                          Votre email n&apos;est pas vérifié.
                        </p>
                        <button
                          className="font-semibold underline decoration-1"
                          onClick={handleClick}
                          //href="{{ path('app_verify_email_resend') }}"
                        >
                          Renvoyer l&apos;email de vérification
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

export default UserProfile;
