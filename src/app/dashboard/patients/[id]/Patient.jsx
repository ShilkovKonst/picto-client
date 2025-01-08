"use client";
import Link from "next/link";
import Accordion from "@/_components/_shared/Accordion";
import Separator from "@/_components/_shared/Separator";
import EntityHeader from "@/_components/dashboard/EntityHeader";

const Patient = ({ patient, notes, session }) => {
  if (patient.user.id != session.id && !session.roles.includes("ROLE_ADMIN"))
    return (
      <div className="flex justify-center items-center">
        Il est interdit d'observer des patients des autres thérapeutes.
      </div>
    );
  return (
    <>
      <table className="table w-full">
        <EntityHeader session={session} entity={patient} entityName="patients" />
        <tbody className="w-full">
          <tr className="grid grid-cols-6 text-sm sm:text-base p-2 *:flex *:justify-start *:items-center">
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">Sexe</th>
            <td className="col-span-4 text-start ml-2 py-1">{patient?.sex}</td>
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">Grade</th>
            <td className="col-span-4 text-start ml-2 py-1">
              {patient?.grade}
            </td>
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">
              <p>Date de naissance</p>
            </th>
            <td className="col-span-4 text-start ml-2 py-1">
              {new Date(patient?.birthDate).toLocaleDateString("fr-FR")}
            </td>
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">
              Thérapeute actuel
            </th>
            <td className="col-span-4 text-start ml-2 py-1">
              {patient?.user ? (
                <Link
                  href={
                    patient?.user?.id == session.id
                      ? `/dashboard`
                      : `/dashboard/users/${patient?.user?.id}`
                  }
                  className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                >
                  {patient?.user?.firstName + " " + patient?.user?.lastName}
                </Link>
              ) : (
                <div className="bg-red-500 py-1 px-3 rounded-full text-center font-semibold">
                  none
                </div>
              )}
            </td>
            <Separator n={6} />
          </tr>
        </tbody>
      </table>
      <Accordion
        user={patient.user}
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
