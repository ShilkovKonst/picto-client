"use client";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Accordion from "@/_components/_shared/Accordion";

const Tag = ({ session, tag, pictograms }) => {
  return (
    <>
      <table className="table w-full">
        <EntityHeader session={session} entity={tag} entityName="tags" />
      </table>
      {pictograms && (
        <Accordion
          session={session}
          initial={"pictograms"}
          entities={[{ name: "pictograms", entityList: pictograms }]}
        />
      )}
    </>
  );
};

export default Tag;
