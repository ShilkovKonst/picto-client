"use client";
import React, { useState } from "react";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";
import { SuccessIcon, WarningIcon } from "@/_components/icons";

const User = ({ user, patients, notes }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={user} entityName="users" />
        <tbody className="flex flex-col gap-2 w-full">
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Nom</th>
            <td className="text-start w-[45%] lg:w-[30%]">{user?.lastName}</td>
            <th className="text-start w-[40%] lg:w-[20%]">Prénom</th>
            <td className="text-start w-[45%] lg:w-[30%]">{user?.firstName}</td>
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
              {user?.email}
              <div className="relative group text-center w-auto ml-1">
                {user?.verified ? (
                  <>
                    <SuccessIcon />
                    <div className="hidden group-hover:block absolute bottom-6 -right-36 w-72 rounded-lg alert-success p-4">
                      <p className="text-green-800">Email est vérifié.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <WarningIcon />
                    <div className="hidden group-hover:block absolute bottom-6 -right-36 w-72 rounded-lg alert-danger p-4">
                      <p className="text-red-800">
                        Email n&apos;est pas vérifié.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Accordion
        initial={"patients"}
        entities={[
          { name: "patients", entity: patients },
          { name: "notes", entity: notes },
        ]}
      />
    </>
  );
};

export default User;
