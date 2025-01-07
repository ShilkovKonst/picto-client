"use client";
import { useState } from "react";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import SuccessIcon from "@/_components/icons/successIcon";
import UserActions from "@/_components/_shared/molecules/UserActions";
import Accordion from "@/_components/dashboard/Accordion";
import Separator from "@/_components/_shared/atoms/Separator";
import PersonWarningBlock from "@/_components/_shared/atoms/PersonWarningBlock";

const UserProfile = ({ session, notes, patients, verify }) => {
  console.log(notes);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/verify/send-email`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(response);
      if (response.ok) {
        setIsEmailSent(true);
      }
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`${errorDetails.message}`);
      }
      return response.json();
    } catch (error) {
      console.error("Bad credentials:", error.message);
    }
  };

  return (
    <>
      {!session.verified &&
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
          <tr className="w-auto">
            <th className="text-lg flex justify-center items-center">
              <span className="font-bold mx-auto flex justify-center items-center gap-1 relative group">
                Profil
                {session?.active ? (
                  <SuccessIcon />
                ) : (
                  <PersonWarningBlock
                    position={"top"}
                    title={"Votre compte est inactif."}
                    type={"alert"}
                  />
                )}
              </span>
              {session?.active && (
                <UserActions
                  path1="/dashboard/profile/update"
                  path2="/dashboard/profile/deactivate"
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody className="flex flex-col w-full">
          {!session && (
            <tr className="h-[205px] flex justify-center items-center">
              <th className="text-start w-[40%] lg:w-[20%]">
                <Spinner size="xl" aria-label="Loading profile..." />
              </th>
            </tr>
          )}
          {session && (
            <>
              <tr className="grid grid-cols-6 gap-1 lg:gap-0 text-sm sm:text-base p-2">
                <Separator n={6} />
                <th className="col-span-2 text-start">Nom</th>
                <td className="col-span-4 text-start">{session?.lastName}</td>
                <Separator n={6} />
                <th className="col-span-2 text-start">Prénom</th>
                <td className="col-span-4 text-start">{session?.firstName}</td>
                <Separator n={6} />
                <th className="col-span-2 text-start">Fonction</th>
                <td className="col-span-4 text-start">{session?.job}</td>
                <Separator n={6} />
                <th className="col-span-2 text-start">Institution</th>
                <td className="col-span-4 text-start flex items-center">
                  <Link
                    href={`/dashboard/institutions/${session?.institution?.id}`}
                    className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                  >
                    {session?.institution?.title}
                  </Link>
                </td>
                <Separator n={6} />
                <th className="col-span-2 text-start">Email</th>
                <td className="col-span-4 text-start">
                  <div className="flex items-center gap-1">
                    {session?.sub}
                    {session?.verified ? (
                      <SuccessIcon />
                    ) : (
                      <PersonWarningBlock
                        position={"topLeft"}
                        title={"Votre email n'est pas verifié."}
                        type={"alert"}
                      />
                    )}
                  </div>
                  <div className="">
                    {!session?.verified &&
                      (!isEmailSent ? (
                        <p className="text-red-800 text-xs font-light">
                          Votre email n&apos;est pas vérifié.{" "}
                          <button
                            className="font-normal underline decoration-1"
                            onClick={handleClick}
                          >
                            Envoyer l&apos;email de vérification
                          </button>
                        </p>
                      ) : (
                        <p className="text-yellow-800 text-xs font-light">
                          L'émail de vérification à été envoyé. Vérifiez votre
                          boîte de lettres.{" "}
                          <button
                            className="font-normal underline decoration-1"
                            onClick={handleClick}
                          >
                            Renvoyer l&apos;email de vérification
                          </button>
                        </p>
                      ))}
                  </div>
                </td>
                <Separator n={6} />
              </tr>
            </>
          )}
        </tbody>
      </table>
      <Accordion
        user={session}
        session={session}
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
