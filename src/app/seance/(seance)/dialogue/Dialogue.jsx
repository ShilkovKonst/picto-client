"use client";
import { getAllAsList } from "@/_lib/entityApiUtil";
import { useEffect, useState } from "react";

const Dialogue = ({ questions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPictogram, setSelectedPictogram] = useState(null);

  const [categories, setCategories] = useState([]);
  const [pictograms, setPictograms] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getAllAsList("categories", null);
      setCategories(response);
    }
    selectedQuestion && fetchCategories();
  }, [selectedQuestion]);

  useEffect(() => {
    async function fetchPictograms() {
      const response = await getAllAsList("pictograms", null);
      setPictograms(response);
    }
    selectedCategory && fetchPictograms();
  }, [selectedCategory]);

  const handleClick = (entityList, setState) => {
    const randomIndex = Math.floor(Math.random() * entityList.length);
    setState(entityList[randomIndex]);
  };

  return (
    <div className="">
      <button
        onClick={() => handleClick(questions, setSelectedQuestion)}
        className="bg-pform w-full font-bold py-2 px-4 rounded-full"
      >
        {selectedQuestion ? selectedQuestion.title : "Select question"}
      </button>

      {selectedQuestion && (
        <button
          onClick={() => handleClick(categories, setSelectedCategory)}
          className="bg-pform w-full font-bold py-2 px-4 rounded-full"
        >
          {selectedCategory ? selectedCategory.title : "Select category"}
        </button>
      )}

      {selectedCategory && (
        <button
          onClick={() => handleClick(pictograms, setSelectedPictogram)}
          className="bg-pform w-full font-bold py-2 px-4 rounded-full"
        >
          {selectedPictogram ? selectedPictogram.title : "Select pictogram"}
        </button>
      )}
      {selectedQuestion?.title}, {selectedCategory?.title}, {selectedPictogram?.title}
    </div>
  );
};

export default Dialogue;
