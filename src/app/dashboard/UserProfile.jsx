"use client";
import { useState } from "react";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import SuccessIcon from "@/_components/icons/successIcon";
import UserActions from "@/_components/dashboard/UserActions";
import Accordion from "@/_components/shared/Accordion";
import Separator from "@/_components/shared/Separator";
import PersonWarningBlock from "@/_components/dashboard/PersonWarningBlock";
import UserItem from "./users/[id]/UserItem";

const UserProfile = ({ session, notes, patients, verify }) => {
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
      <section className="table w-full">
        <div>
          <div className="w-auto">
            <div className="text-lg flex justify-center items-center">
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
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {!session && (
            <div className="h-[205px] flex justify-center items-center">
              <div className="text-start w-[40%] lg:w-[20%]">
                <Spinner size="xl" aria-label="Loading profile..." />
              </div>
            </div>
          )}
          {session && (
            <>
              <UserItem
                title={"Nom"}
                content={session?.lastName + " " + session?.firstName}
              />
              <UserItem title={"Fonction"} content={session?.job} />
              <UserItem
                title={"Institution"}
                content={
                  <Link
                    href={`/dashboard/institutions/${session?.institution?.id}`}
                    className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                  >
                    {session?.institution?.title}
                  </Link>
                }
              />
              <UserItem
                title={"Email"}
                content={
                  <>
                    <p>{session?.sub}</p>
                    <div className="relative group text-center w-auto ml-1">
                      {session?.verified ? (
                        <SuccessIcon />
                      ) : (
                        <>
                          <WarningIcon />
                          <div className="hidden group-hover:block absolute bottom-6 -right-0 lg:-right-36 w-72 rounded-lg alert-danger p-4">
                            <p className="text-red-800">
                              Email n&apos;est pas vérifié.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                }
              />
              <UserItem title={"Téléphone"} content={session?.phoneNumber} />
              <UserItem
                title={"Rôles"}
                content={
                  <>
                    {session?.roles?.map((r, i) => (
                      <div
                        key={i}
                        className="cursor-default text-xs bg-primary hover:bg-secondary transition ease-in-out duration-300 text-white py-1 px-3 rounded-full"
                      >
                        {r}
                      </div>
                    ))}
                  </>
                }
              />
              <Separator n={5} />
            </>
          )}
        </div>
      </section>
      <Accordion
        user={session}
        session={session}
        initial={"patients"}
        entities={[
          { name: "patients", list: patients },
          { name: "notes", list: notes },
        ]}
      />
    </>
  );
};

export default UserProfile;
