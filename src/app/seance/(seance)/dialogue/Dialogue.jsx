"use client";
import ImageSlider from "@/_components/seance/ImageSlider";
import { getAllAsList } from "@/_lib/entityApiUtil";
import { useEffect, useState } from "react";

const Dialogue = ({ questions, categories, pictograms }) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPictogram, setSelectedPictogram] = useState(null);

  const handleClick = (entity, setState) => {
    setState(entity);
  };

  return (
    <div className="">
      <button
        onClick={() => setQuestionModal((prev) => !prev)}
        className="z-20 relative bg-pform w-full h-12 font-bold py-2 px-4 rounded-full"
      >
        <p>
          {selectedQuestion
            ? selectedQuestion.title
            : "Choisir une question..."}
        </p>
        <div
          className={`absolute bg-pform w-[calc(100%-3rem)] h-80 overflow-y-scroll top-full left-[1.5rem] ${
            questionModal
              ? "z-20 flex flex-col justify-center items-center"
              : "hidden"
          }`}
        >
          {questions.map((question, i) => (
            <div
              key={i}
              className="bg-secondary w-full my-1"
              onClick={() => handleClick(question, setSelectedQuestion)}
            >
              {question.title}
            </div>
          ))}
        </div>
        <div
          className={`absolute -top-[0.75rem] -left-[0.75rem] bg-primary-trans-30 w-screen h-screen z-10 ${
            questionModal
              ? "block"
              : "hidden"
          }`}
        ></div>
      </button>

      {selectedQuestion && (
        <ImageSlider
          handleClick={handleClick}
          setState={setSelectedCategory}
          slides={categories.filter((cat) =>
            cat.questions.includes(selectedQuestion.id)
          )}
        />
      )}

      {selectedCategory && (
        <ImageSlider
          handleClick={handleClick}
          setState={setSelectedPictogram}
          slides={pictograms.filter(
            (picto) => picto.category.id == selectedCategory.id
          )}
        />
      )}
    </div>
  );
};

export default Dialogue;
