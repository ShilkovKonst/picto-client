"use client";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";
import Link from "next/link";

const Patient = ({ patient, notes, session }) => {
  console.log(patient);
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={patient} entityName="patients" />
        <tbody className="w-full">
          <tr className="grid grid-cols-6 text-sm sm:text-base p-2 *:flex *:justify-start *:items-center">
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">Sexe</th>
            <td className="col-span-4 text-start ml-2 py-1">{patient?.sex}</td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">Grade</th>
            <td className="col-span-4 text-start ml-2 py-1">
              {patient?.grade}
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">
              <p>Date de naissance</p>
            </th> 
            <td className="col-span-4 text-start ml-2 py-1">
              {new Date(patient?.birthDate).toLocaleDateString("fr-FR")}
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">
              Thérapeute actuel
            </th>
            <td className="col-span-4 text-start ml-2 py-1">
              {patient?.user ? (
                <Link
                  href={`/dashboard/users/${patient?.user?.id}`}
                  className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
                >
                  {patient?.user?.firstName + " " + patient?.user?.lastName}
                </Link>
              ) : (
                <div className="bg-red-500 py-1 px-3 rounded-full text-center font-semibold">
                  none
                </div>
              )}
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
          </tr>
        </tbody>
      </table>
      <Accordion
        patient={patient}
        session={session}
        initial={"notes"}
        entities={[
          {
            name: "notes",
            entityList: notes,
          },
        ]}
      />
    </>
  );
};

export default Patient;
