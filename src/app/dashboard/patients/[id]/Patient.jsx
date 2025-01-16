"use client";
import Link from "next/link";
import Accordion from "@/_components/shared/Accordion";
import Separator from "@/_components/shared/Separator";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import { FaMars, FaVenus } from "react-icons/fa6";
import PatientItem from "./PatientItem";

const Patient = ({ patient, notes, session }) => {
  if (patient.user.id != session.id && !session.roles.includes("ROLE_ADMIN"))
    return (
      <div className="flex justify-center items-center">
        Il est interdit d'observer des patients des autres thérapeutes.
      </div>
    );
  return (
    <>
      <section className="table w-full">
        <EntityHeader
          session={session}
          entity={patient}
          entityName="patients"
        />
        <div className="w-full">
          <PatientItem
            title={"Sexe"}
            content={
              <>
                {patient?.sex == "homme" && <FaMars className={"w-6 h-6"} />}
                {patient?.sex == "femme" && <FaVenus className={"w-6 h-6"} />}
              </>
            }
          />
          <PatientItem title={"Grade"} content={patient?.grade} />
          <PatientItem
            title={"Date de naissance"}
            content={new Date(patient?.birthDate).toLocaleDateString("fr-FR")}
          />
          <PatientItem
            title={"Thérapeute actuel"}
            content={
              <>
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
                  <span className="bg-red-500 py-1 px-3 rounded-full text-center font-semibold">
                    none
                  </span>
                )}
              </>
            }
          />
          <Separator n={6} />
        </div>
      </section>
      <Accordion
        user={patient.user}
        patient={patient}
        session={session}
        initial={"notes"}
        entities={[
          {
            name: "notes",
            list: notes,
          },
        ]}
      />
    </>
  );
};

export default Patient;
