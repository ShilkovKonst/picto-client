"use client";
import React, { useState } from "react";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";

const Question = ({ question, categories }) => {
  return (
    <>
      <table className="table w-full">
        {question && <EntityHead entity={question} entityName="questions" />}
      </table>
      <Accordion
        initial={"categories"}
        entities={[{ name: "categories", entity: categories }]}
      />
    </>
  );
};

export default Question;
