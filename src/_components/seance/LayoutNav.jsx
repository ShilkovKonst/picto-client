"use client";
import { useContext, useState } from "react";
import HeaderImage from "../shared/HeaderImage";
import LayoutLegendModal from "./LayoutLegendModal";
import LayoutManagement from "./LayoutManagement";
import LayoutNavModal from "./LayoutNavModal";
import { SeanceContext } from "@/_context/SeanceContext";

const LayoutNav = ({ session }) => {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const {
    seanceType,
    phraseToShow,
    setPhrase,
    tense,
    setTense,
    form,
    setForm,
    stepPlayId,
    setStepPlayId,
  } = useContext(SeanceContext);

  return (
    <nav className="absolute right-0 top-0 bottom-0 h-screen w-24 bg-pform ">
      <div className="p-1 md:p-3">
        <HeaderImage width={240} />
      </div>
      <LayoutNavModal
        session={session}
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
      />
      <LayoutManagement
        setIsOpen={setIsLegendOpen}
        seanceType={seanceType}
        phraseToShow={phraseToShow}
        setPhrase={setPhrase}
        tense={tense}
        setTense={setTense}
        form={form}
        setForm={setForm}
        stepPlayId={stepPlayId}
        setStepPlayId={setStepPlayId}
      />
      <LayoutLegendModal
        isOpen={isLegendOpen}
        setIsOpen={setIsLegendOpen}
        seanceType={seanceType}
      />
      {isNavOpen && (
        <div
          onClick={() => setIsNavOpen(false)}
          className="fixed top-0 left-0 w-full h-full"
        ></div>
      )}
    </nav>
  );
};

export default LayoutNav;
