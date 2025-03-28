"use client";
import { createContext, useState } from "react";

export const SeanceContext = createContext();

export default function SeanceProvider({ children }) {
  const [seanceType, setSeanceType] = useState("");
  const [tense, setTense] = useState("PRESENT");
  const [form, setForm] = useState("AFFIRMATIVE");
  const [phraseToShow, setPhraseToShow] = useState("");
  const [stepPlayId, setStepPlayId] = useState(0);
  const [phrase, setPhrase] = useState({
    text: "",
    words: Array(1).fill(null),
    audio: null,
  });
  const value = {
    seanceType,
    setSeanceType,
    tense,
    setTense,
    form,
    setForm,
    phrase,
    setPhrase,
    phraseToShow,
    setPhraseToShow,
    stepPlayId,
    setStepPlayId,
  };
  return (
    <SeanceContext.Provider value={value}>{children}</SeanceContext.Provider>
  );
}
