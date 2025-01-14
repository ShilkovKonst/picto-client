"use client";
import Link from "next/link";
import Accordion from "@/_components/_shared/Accordion";
import Separator from "@/_components/_shared/Separator";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import { SuccessIcon, WarningIcon } from "@/_components/icons";
import UserItem from "./UserItem";

const User = ({ user, session, patients, notes }) => {
  return (
    <>
      <section className="table w-full">
        <EntityHeader entity={user} entityName="users" session={session} />
        <div className="w-full">
          <UserItem
            title={"Nom"}
            content={user?.lastName + " " + user?.firstName}
          />
          <UserItem title={"Fonction"} content={user?.job} />
          <UserItem
            title={"Institution"}
            content={
              <Link
                href={`/dashboard/institutions/${user?.institution?.id}`}
                className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
              >
                {user?.institution?.title}
              </Link>
            }
          />
          <UserItem
            title={"Email"}
            content={
              <>
                <p>{user?.email}</p>
                <div className="relative group text-center w-auto ml-1">
                  {user?.verified ? (
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
          <UserItem title={"Téléphone"} content={user?.phoneNumber} />
          <UserItem
            title={"Rôles"}
            content={
              <>
                {user?.roles?.map((r, i) => (
                  <div
                    key={i}
                    className="cursor-default text-xs bg-primary hover:bg-secondary transition ease-in-out duration-300 text-white py-1 px-3 rounded-full"
                  >
                    {r.title}
                  </div>
                ))}
              </>
            }
          />
          <Separator n={5} />
        </div>
      </section>
      <Accordion
        user={user}
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

export default User;
