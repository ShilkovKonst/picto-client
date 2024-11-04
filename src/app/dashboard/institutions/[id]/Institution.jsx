"use client";
import Accordion from "@/_components/dashboard/_accordion";
import EntityHead from "@/_components/dashboard/_entityHead";

const Institution = ({ institution, users }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={institution} entityName="institutions" />
        <tbody className="flex flex-col gap-2 w-full">
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Nom du contact</th>
            <td className="text-start w-[45%] lg:w-[30%]">
              {institution?.contactName}
            </td>
          </tr>
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[40%] lg:w-[20%]">Email</th>
            <td className="text-start w-[45%] lg:w-[30%]">
              {institution?.email}
            </td>
            <th className="text-start w-[40%] lg:w-[20%]">
              Numéro de téléphone
            </th>
            <td className="text-start w-[45%] lg:w-[30%]">
              {institution?.phoneNumber}
            </td>
          </tr>
          <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
            <th className="text-start w-[20%] lg:w-[15%]">Code</th>
            <td className="text-start flex items-center w-[75%] lg:w-[55%]">
              {institution?.code}
            </td>
          </tr>
        </tbody>
      </table>
      <Accordion
        initial={"users"}
        entities={[{ name: "users", entityList: users }]}
      />
    </>
  );
};

export default Institution;
