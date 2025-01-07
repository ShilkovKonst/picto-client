"use client";
import EntityHeader from "@/_components/_shared/molecules/EntityHeader";
import Accordion from "@/_components/dashboard/Accordion";

const Question = ({ question, categories, session }) => {
  return (
    <>
      <table className="table w-full">
        {question && (
          <EntityHeader
            entity={question}
            entityName="questions"
            session={session}
          />
        )}
      </table>
      <Accordion
        session={session}
        initial={"categories"}
        entities={[{ name: "categories", entityList: categories }]}
      />
    </>
  );
};

export default Question;
