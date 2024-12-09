"use client";
import Separator from "@/_components/common/separator";
import EntityHead from "@/_components/dashboard/_entityHead";
import Link from "next/link";

const Note = ({ note, session }) => {
  if (note.user.id != session.id && !session.roles.includes("ROLE_ADMIN"))
    return (
      <div className="flex justify-center items-center">
        Il est interdit d'observer des patients des autres thérapeutes.
      </div>
    );
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={note} entityName="notes" />
        <tbody className="w-full">
          <tr className="grid grid-cols-6 text-sm sm:text-base p-2 *:flex *:justify-start *:items-center">
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">Estimation</th>
            <td className="col-span-4 text-start ml-2 py-1">
              {note?.estimation}
            </td>
            <Separator n={6} />
            <th className="col-span-6 text-sm text-start py-1">Commentaire</th>
            <td className="col-span-6 text-sm text-start py-1">
              {note?.comment?.split("/n").map((c, i) => (
                <div key={i} className="">
                  <p>{c}</p>
                  {i == note.comment.split("/n") - 1 && <br />}
                </div>
              ))}
            </td>
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">
              <p>Date de création</p>
            </th>
            <td className="col-span-4 text-start ml-2 py-1">
              {new Date(note?.createdAt).toLocaleDateString("fr-FR")}
            </td>
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">Thérapeute</th>
            <td className="col-span-4 text-start ml-2 py-1">
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
            </td>
            <Separator n={6} />
            <th className="col-span-2 text-sm text-start py-1">Patient</th>
            <td className="col-span-4 text-start ml-2 py-1">
              <Link
                href={`/dashboard/patients/${note?.patient?.id}`}
                className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
              >
                {note?.patient.firstName.charAt(0) +
                  ". " +
                  note?.patient.lastName}
              </Link>
            </td>
            <Separator n={6} />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Note;
