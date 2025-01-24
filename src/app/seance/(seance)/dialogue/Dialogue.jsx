"use client";
import Dropzone from "@/_components/seance/Dropzone";
import ImageSlider from "@/_components/seance/ImageSlider";
import DialogueQuestionSelector from "@/_components/seance/DialogueQuestionSelector";
import { textToSpeech } from "@/_lib/textToSpeech";
import { useState } from "react";
import { handleDragStart } from "@/_lib/DragNDrop";

const Dialogue = ({ questions, categories, pictograms }) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPictogram, setSelectedPictogram] = useState(null);
  const [dropZones, setDropZones] = useState(Array(10).fill(null));
  const [draggedItem, setDraggedItem] = useState(null);

  const handleClick = (entity, setState) => {
    setState(entity);
    questionModal && setQuestionModal(false);
    textToSpeech(entity.title);
  };

  return (
    <div className="relative">
      <DialogueQuestionSelector
        questions={questions}
        questionModal={questionModal}
        setQuestionModal={setQuestionModal}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        handleClick={handleClick}
      />
      {selectedQuestion && (
        <ImageSlider
          cursorClass="cursor-pointer"
          handleClick={handleClick}
          setState={setSelectedCategory}
          slides={categories.filter((cat) =>
            cat.questions.includes(selectedQuestion.id)
          )}
        />
      )}
      {selectedCategory && (
        <ImageSlider
          cursorClass="cursor-grab"
          handleClick={handleClick}
          handleDragStart={handleDragStart}
          setDraggedItem={setDraggedItem}
          setDropZones={setDropZones}
          setState={setSelectedPictogram}
          slides={pictograms.filter(
            (picto) => picto.category.id == selectedCategory.id
          )}
        />
      )}
      <Dropzone
        dropZones={dropZones}
        setDropZones={setDropZones}
        draggedItem={draggedItem}
      />
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <p className="dropzone flex justify-center items-center overflow-hidden h-16 md:h-20 lg:h-24 xl:mx-auto rounded-xl border-2 border-primary">
          {dropZones.map((slide) => (slide ? slide.title + " " : " "))}
        </p>
      </div>
    </div>
  );
};

export default Dialogue;
