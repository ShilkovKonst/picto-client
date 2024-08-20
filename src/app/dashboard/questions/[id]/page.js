import Question from "@/_components/dashboard/questions/Question";
import { getAllByQuestionId } from "@/_helpers/categoryApiHelper";
import { getOneById } from "@/_helpers/questionApiHelper";
import React from "react";

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
