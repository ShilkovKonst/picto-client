"use client";
import Dropzone from "@/_components/seance/Dropzone";
import ImageSlider from "@/_components/seance/ImageSlider";
import { useContext, useEffect, useState } from "react";
import { getAllByOtherAsList } from "@/_lib/entityApiUtil";
import { SeanceContext } from "@/_context/SeanceContext";
import { processPhrase } from "@/_lib/grammar";
import { capitalizeWords } from "@/_lib/capitalizeWord";

const Exchange = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [pictograms, setPictograms] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [subpictograms, setSubpictograms] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const { tense, setTense } = useContext(SeanceContext);
  const { phrase, setPhrase } = useContext(SeanceContext);
  const { phraseToShow, setPhraseToShow } = useContext(SeanceContext);

  const handleClick = (entity, setState, selectedItem) => {
    entity.id == selectedItem?.id ? setState(null) : setState(entity);
  };

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
    selectedCategory
      ? fetch("pictograms", "category", setPictograms, selectedCategory.id)
      : setPictograms(null);
    selectedCategory
      ? fetch(
          "categories",
          "supercategory",
          setSubcategories,
          selectedCategory.id
        )
      : setSubcategories(null);
  }, [selectedCategory]);

  useEffect(() => {
    selectedSubcategory
      ? fetch(
          "pictograms",
          "category",
          setSubpictograms,
          selectedSubcategory.id
        )
      : setSubpictograms(null);
  }, [selectedSubcategory]);

  useEffect(() => {
    setPhraseToShow("");
    console.log("phrase", phrase);
    console.log("phraseToShow", phraseToShow);
    processPhrase(phrase, setPhraseToShow, tense);
    setPhraseToShow((prev) => capitalizeWords(prev));
  }, [phrase?.text]);

  return (
    <div className="relative">
      <ImageSlider
        cursorClass="cursor-pointer"
        handleClick={handleClick}
        setState={setSelectedCategory}
        slides={categories.sort((a, b) => (a.title < b.title ? -1 : 1))}
        selectedItem={selectedCategory}
      />
      {selectedCategory && subcategories?.length > 0 && (
        <ImageSlider
          cursorClass="cursor-pointer"
          handleClick={handleClick}
          setState={setSelectedSubcategory}
          slides={subcategories.sort((a, b) => (a.title < b.title ? -1 : 1))}
          selectedItem={selectedSubcategory}
        />
      )}
      {selectedCategory && pictograms?.length > 0 && (
        <ImageSlider
          cursorClass="cursor-grab"
          slides={pictograms.sort((a, b) => (a.title < b.title ? -1 : 1))}
          phrase={phrase}
          setDraggedItem={setDraggedItem}
          setPhrase={setPhrase}
        />
      )}
      {selectedCategory && subpictograms?.length > 0 && (
        <ImageSlider
          cursorClass="cursor-grab"
          slides={subpictograms.sort((a, b) => (a.title < b.title ? -1 : 1))}
          phrase={phrase}
          setDraggedItem={setDraggedItem}
          setPhrase={setPhrase}
        />
      )}
      <Dropzone
        phrase={phrase}
        setPhrase={setPhrase}
        draggedItem={draggedItem}
        setDraggedItem={setDraggedItem}
      />
      <div className="bg-pform flex flex-wrap justify-start px-8 py-2 mb-3 gap-3 xl:gap-0 rounded-2xl shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]">
        <p className="flex text-xl justify-center items-center overflow-hidden h-16 md:h-20 lg:h-24 xl:mx-auto rounded-xl">
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

export default Exchange;
