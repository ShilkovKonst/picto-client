"use client";
import EntityHead from "@/_components/dashboard/_entityHead";
import Link from "next/link";

const Note = ({ note }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={note} entityName="notes" />
        <tbody className="w-full">
          <tr className="grid grid-cols-6 text-sm sm:text-base p-2 *:flex *:justify-start *:items-center">
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">Estimation</th>
            <td className="col-span-4 text-start ml-2 py-1">
              {note?.estimation}
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-6 text-sm text-start py-1">Commentaire</th>
            <td className="col-span-6 text-sm text-start py-1">
              {note?.comment.split("/n").map((c, i) => (
                <div key={i} className="">
                  <p>{c}</p>
                  {i == note.comment.split("/n") - 1 && <br />}
                </div>
              ))}
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">
              <p>Date de création</p>
            </th>
            <td className="col-span-4 text-start ml-2 py-1">
              {new Date(note?.createdAt).toLocaleDateString("fr-FR")}
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">Thérapeute</th>
            <td className="col-span-4 text-start ml-2 py-1">
              <Link
                href={`/dashboard/users/${note?.user?.id}`}
                className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
              >
                {note?.user.firstName.charAt(0) + ". " + note?.user.lastName}
              </Link>
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
            <th className="col-span-2 text-sm text-start py-1">Patient</th>
            <td className="col-span-4 text-start ml-2 py-1">
              <Link
                href={`/dashboard/patients/${note?.patient?.id}`}
                className="py-1 px-3 rounded-full text-white text-center text-xs hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
              >
                {note?.patient.firstName.charAt(0) +
                  ". " +
                  note?.patient.lastName}
              </Link>
            </td>
            <td className="border col-span-6 bg-pbg-trans-bb"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Note;
