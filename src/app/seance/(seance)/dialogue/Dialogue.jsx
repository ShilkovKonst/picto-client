"use client";
import Dropzone from "@/_components/seance/Dropzone";
import ImageSlider from "@/_components/seance/ImageSlider";
import DialogueQuestionSelector from "@/_components/seance/DialogueQuestionSelector";
import { textToSpeech } from "@/_lib/textToSpeech";
import { useContext, useEffect, useState } from "react";
import { getAllByOtherAsList } from "@/_lib/entityApiUtil";
import { SeanceContext } from "@/_context/SeanceContext";
import { processPhrase } from "@/_lib/grammar";

const Dialogue = ({ questions }) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [pictograms, setPictograms] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const { phrase, setPhrase } = useContext(SeanceContext);
  const { phraseToShow, setPhraseToShow } = useContext(SeanceContext);

  const handleClick = (entity) => {
    setSelectedQuestion(entity);
    questionModal && setQuestionModal(false);
    textToSpeech(entity.title);
  };

  const fetchPictos = async () => {
    setPictograms(
      await getAllByOtherAsList("pictograms", "question", selectedQuestion.id)
    );
  };

  useEffect(() => {
    selectedQuestion && fetchPictos();
  }, [selectedQuestion]);

  useEffect(() => {
    setPhraseToShow("");
    console.log("phrase.text", phrase.text)
    console.log("phraseToShow", phraseToShow)
    processPhrase(phrase, setPhraseToShow, selectedQuestion);
    // if (phrase.text) {
    //   const words = phrase.words;
    //   for (let i = 0; i < words.length; i++) {
    //     if (words[i] != null && i == 0) {
    //       words[i].pictogram.type == "pronom" ||
    //       words[i].pictogram.type == "determinant"
    //         ? console.log("i = " + i + ", so far so good")
    //         : console.log(
    //             "i = " + i + ", so far not so good: " + words[i].pictogram.type
    //           );
    //       setPhraseToShow(words[i].pictogram.title);
    //     }
    //     if (words[i] != null && i != 0) {
    //       console.log("current word", words[i]);
    //       switch (words[i].pictogram.type) {
    //         case "verbe":
    //           for (let j = i - 1; j >= 0; j--) {
    //             console.log("j = " + j);
    //             if (
    //               words[j].pictogram.type == "verbe" ||
    //               words[j].pictogram.type == "invariable"
    //             ) {
    //               console.log("previous word: ", words[j].pictogram.tags);
    //               const conjugation = words[i].pictogram.conjugations.find(
    //                 (c) => c.tense == selectedQuestion.tense
    //               );
    //             }
    //             if (words[j].pictogram.type == "pronom") {
    //               console.log("previous word: ", words[j].pictogram.tags);
    //               irregularId(words[i].pictogram.tags)
    //                 ? setPhraseToShow(
    //                     (prev) =>
    //                       prev +
    //                       " " +
    //                       words[i].pictogram?.irregular?.conjugations[
    //                         generateConjugationKey(
    //                           selectedQuestion.tense,
    //                           words[j].pictogram.tags[1].title,
    //                           words[j].pictogram.tags[2].title
    //                         )
    //                       ]
    //                   )
    //                 : setPhraseToShow(
    //                     (prev) => prev + " " + words[i].pictogram?.title
    //                   );
    //             }
    //             if (
    //               words[j].pictogram.type == "nom" &&
    //               words[j - 1] != null &&
    //               words[j - 1].pictogram.type == "determinant"
    //             ) {
    //               console.log(
    //                 "preprevious word: ",
    //                 words[j - 1].pictogram.tags
    //               );
    //               console.log("previous word: ", words[j].pictogram.tags);
    //               const key =
    //                 selectedQuestion.tense +
    //                 "_" +
    //                 words[j - 1].pictogram.tags[1].title +
    //                 "_" +
    //                 words[j - 1].pictogram.tags[2].title;
    //               irregularId(words[i].pictogram.tags)
    //                 ? setPhraseToShow(
    //                     (prev) =>
    //                       prev +
    //                       " " +
    //                       words[i].pictogram?.irregular?.conjugations[key]
    //                   )
    //                 : setPhraseToShow(
    //                     (prev) => prev + " " + words[i].pictogram?.title
    //                   );
    //             }
    //             if (
    //               words[j].pictogram.type == "adjectif" &&
    //               words[j - 1] != null &&
    //               words[j - 1].pictogram.type == "nom" &&
    //               words[j - 2] != null &&
    //               words[j - 2].pictogram.type == "determinant"
    //             ) {
    //               console.log(
    //                 "preprevious word: ",
    //                 words[j - 2].pictogram.tags
    //               );
    //               console.log("previous word: ", words[j - 1].pictogram.tags);
    //               const key =
    //                 selectedQuestion.tense +
    //                 "_" +
    //                 words[j - 2].pictogram.tags[1].title +
    //                 "_" +
    //                 words[j - 2].pictogram.tags[2].title;
    //               irregularId(words[i].pictogram.tags)
    //                 ? setPhraseToShow(
    //                     (prev) =>
    //                       prev +
    //                       " " +
    //                       words[i].pictogram?.irregular?.conjugations[key]
    //                   )
    //                 : setPhraseToShow(
    //                     (prev) => prev + " " + words[i].pictogram?.title
    //                   );
    //             }
    //           }
    //           break;
    //         case "nom":
    //           for (let j = i - 1; j >= 0; j--) {
    //             if (words[j].pictogram.type == "determinant") {
    //               console.log("previous word: ", words[j].pictogram.tags);
    //               irregularId(words[i].pictogram.tags)
    //                 ? setPhraseToShow(
    //                     (prev) =>
    //                       prev +
    //                       " " +
    //                       words[i].pictogram?.irregular?.conjugations[key]
    //                   )
    //                 : setPhraseToShow(
    //                     (prev) => prev + " " + words[i].pictogram?.title
    //                   );
    //             }
    //           }
    //           break;
    //         case "adjectif":
    //           break;
    //         case "pronom":
    //           break;
    //         case "determinant":
    //           break;
    //         case "nombre":
    //           break;
    //         case "interrogatif":
    //           break;
    //         case "invariable":
    //           break;
    //       }
    //       words[i].pictogram.type == "verbe";
    //     }
    //   }
    // }
    //TODO phrase correction logic
  }, [phrase.text]);

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
          setPhrase={setPhrase}
        />
      )}
      <Dropzone
        phrase={phrase}
        setPhrase={setPhrase}
        draggedItem={draggedItem}
      />
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <p className="flex text-xl justify-center items-center overflow-hidden h-16 md:h-20 lg:h-24 xl:mx-auto rounded-xl">
          {phraseToShow}
        </p>
      </div>
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <div className="flex justify-center items-start gap-3 border overflow-hidden xl:mx-auto rounded-xl">
          {phrase.words.map(
            (w, i) =>
              w && (
                <div key={i}>
                  <p>{w?.pictogram?.type}</p>
                  {w?.pictogram?.tags?.map((t, j) => (
                    <p key={j}>{t.title}</p>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
