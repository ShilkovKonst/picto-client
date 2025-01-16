"use client";
import Separator from "@/_components/shared/Separator";
import Accordion from "@/_components/shared/Accordion";
import EntityHead from "@/_components/dashboard/EntityHeader";
import InstitutionItem from "./InstitutionItem";

const Institution = ({ institution, users, session }) => {
  return (
    <>
      <section className="table w-full">
        <EntityHead
          session={session}
          entity={institution}
          entityName="institutions"
        />
        <div className="*:grid *:grid-cols-5 text-sm sm:text-base p-2">
          <InstitutionItem
            title={"Nom du contact:"}
            content={institution?.contactName}
          />
          <InstitutionItem title={"Email:"} content={institution?.email} />
          <InstitutionItem
            title={"Téléphone:"}
            content={institution?.phoneNumber}
          />
          <InstitutionItem title={"Code:"} content={institution?.code} />
          <Separator />
        </div>
      </section>
      <Accordion
        initial={"users"}
        entities={[{ name: "users", list: users }]}
        session={session}
        institution={institution}
      />
    </>
  );
};

export default Institution;
