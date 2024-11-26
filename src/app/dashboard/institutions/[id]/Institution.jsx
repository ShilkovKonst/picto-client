"use client";
import Accordion from "@/_components/dashboard/_accordion";
import EntityHead from "@/_components/dashboard/_entityHead";

const Institution = ({ institution, users, session }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={institution} entityName="institutions" />
        <tbody className="w-full">
          <tr className="grid grid-cols-5 text-sm sm:text-base p-2">
            <th className="col-span-1 text-sm text-start py-1">Nom du contact</th>
            <td className="col-span-4 text-start ml-2 py-1">
              {institution?.contactName}
            </td>
            <td className="border col-span-5 bg-pbg-trans-bb"></td>
            <th className="col-span-1 text-sm text-start py-1">Email</th>
            <td className="col-span-4 text-start py-1 ml-2">{institution?.email}</td>
            <td className="border col-span-5 bg-pbg-trans-bb"></td>
            <th className="col-span-1 text-sm text-start py-1">Téléphone</th>
            <td className="col-span-4 text-start py-1 ml-2">
              {institution?.phoneNumber}
            </td>
            <td className="border col-span-5 bg-pbg-trans-bb"></td>
            <th className="col-span-1 text-sm text-start py-1">Code</th>
            <td className="col-span-4 text-start py-1 ml-2">{institution?.code}</td>
            <td className="border col-span-5 bg-pbg-trans-bb"></td>
          </tr>
        </tbody>
      </table>
      <Accordion
        initial={"users"}
        entities={[{ name: "users", entityList: users }]}
        session={session}
      />
    </>
  );
};

export default Institution;
