"use client";
import EntityHead from "@/_components/dashboard/_entityHead";
import Link from "next/link";

const Note = ({ note }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={note} entityName="notes" />
        <tbody className="flex flex-col gap-2 w-full">
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Estimation</th>
            <td className="text-start w-[45%] lg:w-[30%]">
              {note?.estimation}
            </td>
          </tr>
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Thérapeute</th>
            <td className="text-start w-[45%] lg:w-[30%]">
              <Link
                href={`/dashboard/users/${note?.user?.id}`}
                className="py-1 px-3 rounded-full text-white text-center hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
              >
                {note?.user.firstName.charAt(0) + ". " + note?.user.lastName}
              </Link>
            </td>
            <th className="text-start w-[40%] lg:w-[20%]">Patient</th>
            <td className="text-start w-[45%] lg:w-[30%]">
              <Link
                href={`/dashboard/patients/${note?.patient?.id}`}
                className="py-1 px-3 rounded-full text-white text-center hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
              >
                {note?.patient.firstName.charAt(0) +
                  ". " +
                  note?.patient.lastName}
              </Link>
            </td>
          </tr>
          <tr className="flex flex-col md:flex-row gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Déscription</th>
            <td className="text-start w-[45%] lg:w-[30%]">
              {note?.comment.split("/n").map((c, i) => (
                <div key={i} className="">
                  <p>{c}</p>
                  {i == note.comment.split("/n")-1 && <br />}
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Note;
