"use client";
import { createContext, useState } from "react";

export const SeanceContext = createContext();

export default function SeanceProvider({ children }) {
  const [phraseToShow, setPhraseToShow] = useState("");
  const [phrase, setPhrase] = useState({
    text: "",
    words: Array(1).fill(null),
    audio: null,
  });
  const value = {
    phrase,
    setPhrase,
    phraseToShow,
    setPhraseToShow,
  };
  return (
    <SeanceContext.Provider value={value}>{children}</SeanceContext.Provider>
  );
}
