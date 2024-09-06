import React from "react";
import { getAllByQuestionId } from "@/_helpers/categoryApiHelper";
import { getOneById } from "@/_helpers/questionApiHelper";
import Question from "./Question";

const page = async ({ params }) => {
  const question = await getOneById(params.id);
  const categories = await getAllByQuestionId(params.id);

  return (
    <Question
      question={question ?? null}
      categories={categories ?? null}
    />
  );
};

export default page;
