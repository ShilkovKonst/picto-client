"use client";
import UserActions from "./userActions";
import WarningIcon from "@/_components/icons/warningIcon";
import SuccessIcon from "@/_components/icons/successIcon";
import { Spinner } from "flowbite-react";
import Accordion from "../_accordion";

const UserProfile = ({ user, notes, patients, verify }) => {
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
      console.log(response);
      return response.json();
    } catch (error) {
      console.error("Bad credentials:", error.message);
    }
  };

  return (
    <>
      {!user.verified &&
        verify &&
        (verify == "success" ? (
          <div className="absolute z-50 -left-0 -top-6 rounded-t-xl bg-green-300 w-full py-2 text-center text-sm md:text-base">
            L&apos;email est verifié
          </div>
        ) : (
          <div className="absolute z-50 -left-0 -top-6 rounded-t-xl bg-red-300 w-full py-2 text-center text-sm md:text-base">
            Le token de vérification est expiré,{" "}
            <button
              className="font-semibold underline decoration-1"
              onClick={handleClick}
            >
              renvoyer l&apos;email
            </button>
          </div>
        ))}
      <table className="table w-full">
        <thead>
          <tr className=" border-b w-auto">
            <th className="text-lg flex justify-center items-center">
              <span className="font-bold mx-auto flex justify-center items-center gap-3 relative group">
                Profil
                {user?.active ? (
                  <SuccessIcon />
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
        <tbody className="flex flex-col w-full *:grid *:grid-cols-4 *:gap-1 *:lg:gap-0">
          {!user && (
            <tr className="h-[205px] flex justify-center items-center">
              <th className="text-start w-[40%] lg:w-[20%]">
                <Spinner
                  className=""
                  size="xl"
                  aria-label="Loading profile..."
                />
              </th>
            </tr>
          )}
          {user && (
            <>
              <tr className="*:col-span-2 *:lg:col-span-1 *:text-start text-sm sm:text-base p-2">
                <th className="">Nom</th>
                <td className="">{user?.lastName}</td>
                <th className="">Prénom</th>
                <td className="">{user?.firstName}</td>
              </tr>
              <tr className="border col-span-4 bg-pbg-trans-88"></tr>
              <tr className="*:col-span-2 *:lg:col-span-1 *:text-start text-sm sm:text-base p-2">
                <th className="">Fonction</th>
                <td className="">{user?.job}</td>
                <th className="">Institution</th>
                <td className="">{user?.institution?.title}</td>
              </tr>
              <tr className="border col-span-4 bg-pbg-trans-88"></tr>
              <tr className="text-sm sm:text-base p-2">
                <th className="col-span-1 ">Email</th>
                <td className="col-span-3 text-start">
                  <div className="flex items-center gap-3">
                    {user?.sub}
                    {user?.verified ? <SuccessIcon /> : <WarningIcon />}
                  </div>
                  <div className="">
                    {!user?.verified && (
                      <p className="text-red-800">
                        Votre email n&apos;est pas vérifié.{" "}
                        <button
                          className="font-semibold underline decoration-1"
                          onClick={handleClick}
                        >
                          Envoyer l&apos;email de vérification
                        </button>
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <Accordion
        initial={"patients"}
        entities={[
          { name: "patients", entityList: patients },
          { name: "notes", entityList: notes },
        ]}
      />
    </>
  );
};

export default UserProfile;
