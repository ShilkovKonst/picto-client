"use client";
import { createContext, useState } from "react";

export const SeanceContext = createContext();

export default function SeanceProvider({ children }) {
  const [tense, setTense] = useState("PRESENT");
  const [phraseToShow, setPhraseToShow] = useState("");
  const [phrase, setPhrase] = useState({
    text: "",
    words: Array(1).fill(null),
    audio: null,
  });
  const value = {
    tense,
    setTense,
    phrase,
    setPhrase,
    phraseToShow,
    setPhraseToShow,
  };
  return (
    <SeanceContext.Provider value={value}>{children}</SeanceContext.Provider>
  );
}
