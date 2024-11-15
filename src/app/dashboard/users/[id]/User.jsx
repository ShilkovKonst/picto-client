"use client";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";
import { SuccessIcon, WarningIcon } from "@/_components/icons";
import Link from "next/link";

const User = ({ user, session, patients, notes }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={user} entityName="users" session={session} />
        <tbody className="w-full">
          <tr className="grid grid-cols-5 text-sm sm:text-base p-2 border-b">
            <th className="col-span-1 text-sm text-start py-3">
              Nom
            </th>
            <td className="col-span-4 text-start py-3 ml-2">
              {user?.lastName + " " + user?.firstName}{" "}
            </td>
            <td className="border col-span-5 bg-pbg-trans-88"></td>
            <th className="col-span-1 text-sm text-start py-3">
              Fonction
            </th>
            <td className="col-span-4 text-start py-3 ml-2">
              {user?.job}
            </td>
            <td className="border col-span-5 bg-pbg-trans-88"></td>
            <th className="col-span-1 text-sm text-start py-3">
              Institution
            </th>
            <td className="col-span-4 text-start py-3 ml-2">
              <Link
                href={`/dashboard/institutions/${user?.institution?.id}`}
                className="py-1 px-3 rounded-full text-white text-center hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
              >
                {user?.institution?.title}
              </Link>
            </td>
            <td className="border col-span-5 bg-pbg-trans-88"></td>
            <th className="col-span-1 text-sm text-start py-3">
              Email
            </th>
            <td className="col-span-4 text-start py-3 ml-2 flex">
              {user?.email}
              <div className="relative group text-center w-auto ml-1">
                {user?.verified ? (
                  <>
                    <SuccessIcon />
                    <div className="hidden group-hover:block absolute bottom-6 -right-0 lg:-right-36 w-72 rounded-lg alert-success p-4">
                      <p className="text-green-800">Email est vérifié.</p>
                    </div>
                  </>
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
            </td>
            <td className="border col-span-5 bg-pbg-trans-88"></td>
            <th className="col-span-1 text-sm text-start py-3">
              Téléphone
            </th>
            <td className="col-span-4 text-start py-3 ml-2">
              {user?.phoneNumber}
            </td>
            <td className="border col-span-5 bg-pbg-trans-88"></td>
            <th className="col-span-1 text-sm text-start py-3">
              Rôles
            </th>
            <td className="col-span-4 text-start py-3 ml-2 flex flex-wrap gap-1">
              {user?.roles?.map((r, i) => (
                <div
                  key={i}
                  className="cursor-default bg-pbg hover:bg-pred transition ease-in-out duration-300 text-white py-1 px-3 rounded-full"
                >
                  {r.title}
                </div>
              ))}
            </td>
          </tr>
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

export default User;
