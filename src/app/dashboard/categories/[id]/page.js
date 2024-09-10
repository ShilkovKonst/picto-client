import {
  getAllBySupercategory,
  getOneById,
} from "@/_helpers/categoryApiHelper";
import { getAllByCategoryId } from "@/_helpers/questionApiHelper";
import { getAllByCategory } from "@/_helpers/pictoApiHelper";
import React from "react";
import Category from "./Category";

const page = async ({ params }) => {
  const category = await getOneById(params.id);
  const pictograms = await getAllByCategory(params.id);
  const questions = await getAllByCategoryId(params.id);
  const subcategories = await getAllBySupercategory(params.id);
  const supercategory = category.supercategory
    ? await getOneById(category.supercategory)
    : null;

  return (
    <Category
      category={category}
      pictograms={pictograms.length > 0 ? pictograms : null}
      questions={questions.length > 0 ? questions : null}
      subcategories={subcategories.length > 0 ? subcategories : null}
      supercategory={supercategory}
    />
  );
};

export default page;
