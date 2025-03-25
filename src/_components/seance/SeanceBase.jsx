"use client";
import { SeanceContext } from "@/_context/SeanceContext";
import { getAllByOtherAsList } from "@/_lib/entityApiUtil";
import { processPhrase } from "@/_lib/grammar";
import { useContext, useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import SeanceDialogue from "./SeanceDialogue";
import SeanceExchange from "./SeanceExchange";
import { capitalizeWords } from "@/_lib/capitalizeWord";

const SeanceBase = ({ questions, categories, seanceType }) => {
  const [pictograms, setPictograms] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const {
    phrase,
    setPhrase,
    phraseToShow,
    setPhraseToShow,
    tense,
    setTense,
    form,
    setForm,
  } = useContext(SeanceContext);

  const fetch = async (entitytName, otherName, setState, id) => {
    setState(await getAllByOtherAsList(entitytName, otherName, id));
  };

  useEffect(() => {
    setPhrase({
      text: "",
      words: Array(1).fill(null),
      audio: null,
    });
    setPhraseToShow("");
  }, []);

  useEffect(() => {
    setPhraseToShow("");
    processPhrase(phrase, setPhraseToShow, tense, form);
    setPhraseToShow((prev) => capitalizeWords(prev));
  }, [phrase?.text, tense, form]);
  console.log("phrase", phrase);
  console.log("phraseToShow", phraseToShow);

  return (
    <div className="relative">
      {seanceType == "dialogue" && (
        <SeanceDialogue
          fetch={fetch}
          questions={questions}
          pictograms={pictograms}
          setPictograms={setPictograms}
          phrase={phrase}
          setPhrase={setPhrase}
          setDraggedItem={setDraggedItem}
          setTense={setTense}
        />
      )}
      {seanceType == "exchange" && (
        <SeanceExchange
          fetch={fetch}
          categories={categories}
          pictograms={pictograms}
          setPictograms={setPictograms}
          phrase={phrase}
          setPhrase={setPhrase}
          setDraggedItem={setDraggedItem}
        />
      )}
      <Dropzone
        phrase={phrase}
        setPhrase={setPhrase}
        draggedItem={draggedItem}
        setDraggedItem={setDraggedItem}
      />
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <p className="flex text-xl justify-center items-center overflow-hidden h-8 xl:mx-auto rounded-xl">
          {phraseToShow}
        </p>
      </div>
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <div className="flex justify-center items-start gap-3 border overflow-hidden xl:mx-auto rounded-xl">
          {phrase?.words.map(
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

export default SeanceBase;
