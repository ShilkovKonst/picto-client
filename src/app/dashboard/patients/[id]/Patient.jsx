"use client";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";
import Link from "next/link";

const Patient = ({ patient, notes }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={patient} entityName="patients" />
        <tbody className="flex flex-col gap-2 w-full">
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Sexe</th>
            <td className="text-start w-[45%] lg:w-[30%]">{patient?.sex}</td>
            <th className="text-start w-[40%] lg:w-[20%]">Grade</th>
            <td className="text-start w-[45%] lg:w-[30%]">{patient?.grade}</td>
          </tr>
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[35%] lg:w-[35%]">Thérapeute actuel</th>
            <td className="text-start w-[55%] lg:w-[55%]">
              {patient?.user ? (
                <Link
                  href={`/dashboard/users/${patient?.user?.id}`}
                  className="py-1 px-3 rounded-full text-white text-center hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
                >
                  {patient?.user?.firstName + " " + patient?.user?.lastName}
                </Link>
              ) : (
                <div className="bg-red-500 py-1 px-3 rounded-full text-center font-semibold">none</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <Accordion
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
