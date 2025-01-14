"use client";
import Separator from "@/_components/_shared/Separator";
import EntityHead from "@/_components/dashboard/EntityHeader";
import Link from "next/link";
import NoteItem from "./NoteItem";

const Note = ({ note, session }) => {
  if (note.user.id != session.id && !session?.roles?.includes("ROLE_ADMIN"))
    return (
      <div className="flex justify-center items-center">
        Il est interdit d'observer des patients des autres thérapeutes.
      </div>
    );
  return (
    <>
      <section className="table w-full">
        <EntityHead session={session} entity={note} entityName="notes" />
        <div className="w-full *:grid *:grid-cols-6 *:text-sm *:sm:text-base">
          <NoteItem title={"Estimation"} content={note?.estimation} />
          <NoteItem
            title={"Commentaire"}
            content={note?.comment?.split("\n").map((c, i) => (
              <p key={i}>{c}</p>
            ))}
          />
          <NoteItem
            title={"Date de création"}
            content={new Date(note?.createdAt).toLocaleDateString("fr-FR")}
          />
          <NoteItem
            title={"Thérapeute"}
            content={
              <Link
                href={
                  note?.user?.id == session.id
                    ? `/dashboard`
                    : `/dashboard/users/${note?.user?.id}`
                }
                className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
              >
                {note?.user.firstName.charAt(0) + ". " + note?.user.lastName}
              </Link>
            }
          />
          <NoteItem
            title={"Patient"}
            content={
              <Link
                href={`/dashboard/patients/${note?.patient?.id}`}
                className="w-auto py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
              >
                {note?.patient.firstName.charAt(0) +
                  ". " +
                  note?.patient.lastName}
              </Link>
            }
          />
          <Separator n={6} />
        </div>
      </section>
    </>
  );
};

export default Note;
