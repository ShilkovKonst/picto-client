"use client";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Accordion from "@/_components/shared/Accordion";

const Question = ({ question, categories, session }) => {
  return (
    <>
      <section className="table w-full">
        {question && (
          <EntityHeader
            entity={question}
            entityName="questions"
            session={session}
          />
        )}
      </section>
      <Accordion
        session={session}
        initial={"categories"}
        entities={[{ name: "categories", list: categories }]}
      />
    </>
  );
};

export default Question;
