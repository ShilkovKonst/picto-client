"use client";
import { useEffect, useState } from "react";
import DialogueQuestionSelector from "./DialogueQuestionSelector";
import ImageSlider from "./ImageSlider";
import { textToSpeech } from "@/_lib/textToSpeech";

const SeanceDialogue = ({
  fetch,
  questions,
  pictograms,
  setPictograms,
  phrase,
  setPhrase,
  setDraggedItem,
  setTense
}) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSelectedQuestionClick = (entity) => {
    setSelectedQuestion(entity);
    setTense(entity?.tense)
    questionModal && setQuestionModal(false);
    textToSpeech(entity.title);
  };

  useEffect(() => {
    selectedQuestion &&
      fetch("pictograms", "question", setPictograms, selectedQuestion.id);
    setPhrase({
      text: "",
      words: Array(1).fill(null),
      audio: null,
    });
  }, [selectedQuestion]);

  return (
    <>
      <DialogueQuestionSelector
        questions={questions}
        questionModal={questionModal}
        setQuestionModal={setQuestionModal}
        selectedQuestion={selectedQuestion}
        handleClick={handleSelectedQuestionClick}
      />
      {selectedQuestion && pictograms?.length > 0 && (
        <ImageSlider
          cursorClass="cursor-grab"
          slides={pictograms.sort((a, b) =>
            a.category.title < b.category.title ? -1 : 1
          )}
          phrase={phrase}
          setDraggedItem={setDraggedItem}
          setPhrase={setPhrase}
        />
      )}
    </>
  );
};

export default SeanceDialogue;
