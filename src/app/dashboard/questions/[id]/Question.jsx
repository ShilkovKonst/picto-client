"use client";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Accordion from "@/_components/shared/Accordion";

const Question = ({ question, pictograms, session }) => {
  console.log(question);
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
        <div className="*:grid *:grid-cols-5 text-sm sm:text-base p-2">
          <div className="p-1">
            <p className="col-span-1 text-sm text-start font-semibold">
              Temps:
            </p>
            <div className="col-span-4 text-start ml-2 flex justify-start items-center">
              {question.tense}
            </div>
          </div>
        </div>
      </section>
      <Accordion
        session={session}
        initial={"pictograms"}
        entities={[{ name: "pictograms", list: pictograms }]}
      />
    </>
  );
};

export default Question;
