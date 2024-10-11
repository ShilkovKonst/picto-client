"use client";
import React, { useState } from "react";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";

const Question = ({ question, categories }) => {
  const [isOpenCats, setIsOpenCats] = useState(categories?.length > 0);
  return (
    <>
      <table className="table w-full">
        {question && <EntityHead entity={question} entityName="questions" />}
      </table>
      {categories && (
        <Accordion
          state={isOpenCats}
          setState={setIsOpenCats}
          entityName={"categories"}
          entity={categories}
        />
      )}
    </>
  );
};

export default Question;
