"use client";
import Separator from "@/_components/_shared/atoms/Separator";
import Accordion from "@/_components/dashboard/Accordion";
import EntityHead from "@/_components/_shared/molecules/EntityHeader";

const Institution = ({ institution, users, session }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={institution} entityName="institutions" />
        <tbody className="w-full">
          <tr className="grid grid-cols-5 text-sm sm:text-base p-2">
          <Separator n={5} />
            <th className="col-span-1 text-sm text-start py-1">
              Nom du contact
            </th>
            <td className="col-span-4 text-start ml-2 py-1">
              {institution?.contactName}
            </td>
            <Separator n={5} />
            <th className="col-span-1 text-sm text-start py-1">Email</th>
            <td className="col-span-4 text-start py-1 ml-2">
              {institution?.email}
            </td>
            <Separator n={5} />
            <th className="col-span-1 text-sm text-start py-1">Téléphone</th>
            <td className="col-span-4 text-start py-1 ml-2">
              {institution?.phoneNumber}
            </td>
            <Separator n={5} />
            <th className="col-span-1 text-sm text-start py-1">Code</th>
            <td className="col-span-4 text-start py-1 ml-2">
              {institution?.code}
            </td>
            <Separator n={5} />
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
