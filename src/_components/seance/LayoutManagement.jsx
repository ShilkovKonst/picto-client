"use client";
import { FaForwardStep, FaInfo, FaPlay, FaTrashCan } from "react-icons/fa6";
import Separator from "../shared/Separator";
import LayoutManagementItem from "./LayoutManagementItem";
import { SeanceContext } from "@/_context/SeanceContext";
import { useContext } from "react";

const LayoutManagement = ({ setIsOpen }) => {
  const { phraseToShow, setPhrase } = useContext(SeanceContext);
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Separator />
      <LayoutManagementItem
        icon={<FaPlay size={"2rem"} />}
        textTooltip={"Lire la phrase constituée"}
        phrase={phraseToShow}
        usage={"play"}
      />
      <LayoutManagementItem
        icon={<FaForwardStep size={"2rem"} />}
        textTooltip={"Lire la phrase constituée mot par mot"}
        phrase={phraseToShow}
        usage={"play_step"}
      />
      <LayoutManagementItem
        icon={<FaTrashCan size={"2rem"} />}
        textTooltip={"Supprimer les mots et pictogrammes sélectionnés"}
        setPhrase={setPhrase}
        phrase={phraseToShow}
        usage={"delete"}
      />
      <LayoutManagementItem
        icon={<FaInfo size={"2rem"} />}
        textTooltip={"Comment utiliser l'application?"}
        setIsOpen={setIsOpen}
        usage={"legend"}
      />
      <Separator />
    </div>
  );
};

export default LayoutManagement;
