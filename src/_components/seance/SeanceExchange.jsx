"use client";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";

const SeanceExchange = ({
  fetch,
  categories,
  pictograms,
  setPictograms,
  phrase,
  setPhrase,
  setDraggedItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [subpictograms, setSubpictograms] = useState(null);

  const handleSelectedClick = (entity, setState, selectedItem) => {
    entity.id == selectedItem?.id ? setState(null) : setState(entity);
  };

  useEffect(() => {
    if (selectedCategory) {
      setPictograms(null);
      setSelectedSubcategory(null);
      fetch("pictograms", "category", setPictograms, selectedCategory.id);
      fetch(
        "categories",
        "supercategory",
        setSubcategories,
        selectedCategory.id
      );
    } else {
      setPictograms(null);
      setSelectedSubcategory(null);
    }
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

  return (
    <>
      <ImageSlider
        cursorClass="cursor-pointer"
        handleClick={handleSelectedClick}
        setState={setSelectedCategory}
        slides={categories.sort((a, b) => (a.title < b.title ? -1 : 1))}
        selectedItem={selectedCategory}
        slideType={"category"}
      />
      {selectedCategory && subcategories?.length > 0 && (
        <ImageSlider
          cursorClass="cursor-pointer"
          handleClick={handleSelectedClick}
          setState={setSelectedSubcategory}
          slides={subcategories.sort((a, b) => (a.title < b.title ? -1 : 1))}
          selectedItem={selectedSubcategory}
          slideType={"category"}
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
    </>
  );
};

export default SeanceExchange;
