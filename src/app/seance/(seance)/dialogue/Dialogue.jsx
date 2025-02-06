"use client";
import Dropzone from "@/_components/seance/Dropzone";
import ImageSlider from "@/_components/seance/ImageSlider";
import DialogueQuestionSelector from "@/_components/seance/DialogueQuestionSelector";
import { textToSpeech } from "@/_lib/textToSpeech";
import { useEffect, useState } from "react";
import { handleDragStart } from "@/_lib/DragNDrop";
import { getAllByOtherAsList } from "@/_lib/entityApiUtil";

const Dialogue = ({ questions }) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [pictograms, setPictograms] = useState(null);
  const [dropZones, setDropZones] = useState(Array(10).fill(null));
  const [draggedItem, setDraggedItem] = useState(null);
  const [phrase, setPhrase] = useState({
    text: null,
    words: Array(10).fill(null),
    audio: null,
  });

  const handleClick = (entity) => {
    setSelectedQuestion(entity);
    questionModal && setQuestionModal(false);
    textToSpeech(entity.title);
  };

  const fetchPictos = async () => {
    setPictograms(
      await getAllByOtherAsList(
        "pictograms",
        "question",
        selectedQuestion.id,
        null
      )
    );
  };

  useEffect(() => {
    selectedQuestion && fetchPictos();
  }, [selectedQuestion]);

  useEffect(() => {
    phrase.text && console.log(phrase.text)
    //TODO phrase correction logic
  }, [phrase.text]);

  console.log(phrase);
  return (
    <div className="relative">
      <DialogueQuestionSelector
        questions={questions}
        questionModal={questionModal}
        setQuestionModal={setQuestionModal}
        selectedQuestion={selectedQuestion}
        handleClick={handleClick}
      />
      {pictograms && (
        <ImageSlider
          cursorClass="cursor-grab"
          slides={pictograms.sort((a, b) =>
            a.category.title < b.category.title ? -1 : 1
          )}
          setDraggedItem={setDraggedItem}
          setDropZones={setDropZones}
          setPhrase={setPhrase}
        />
      )}
      <Dropzone
        dropZones={dropZones}
        setDropZones={setDropZones}
        setPhrase={setPhrase}
        draggedItem={draggedItem}
      />
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <p className="dropzone flex text-xl justify-center items-center overflow-hidden h-16 md:h-20 lg:h-24 xl:mx-auto rounded-xl">
          {dropZones?.map((slide) => (slide ? slide.title + " " : " "))}
        </p>
      </div>
    </div>
  );
};

export default Dialogue;
