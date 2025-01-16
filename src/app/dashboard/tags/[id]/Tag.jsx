"use client";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Accordion from "@/_components/_shared/Accordion";

const Tag = ({ session, tag, pictograms }) => {
  return (
    <>
      <section className="table w-full">
        <EntityHeader session={session} entity={tag} entityName="tags" />
      </section>
      {pictograms && (
        <Accordion
          session={session}
          initial={"pictograms"}
          entities={[{ name: "pictograms", list: pictograms }]}
        />
      )}
    </>
  );
};

export default Tag;
