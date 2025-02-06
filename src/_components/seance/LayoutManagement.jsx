"use client";
import { FaForwardStep, FaInfo, FaPlay, FaTrashCan } from "react-icons/fa6";
import Separator from "../shared/Separator";
import { useRef } from "react";
import LayoutManagementItem from "./LayoutManagementItem";

const LayoutManagement = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Separator />
      <LayoutManagementItem
        icon={<FaPlay size={"2rem"} />}
        textTooltip={"Lire la phrase constituée"}
        bgColor={"play"}
      />
      <LayoutManagementItem
        icon={<FaForwardStep size={"2rem"} />}
        textTooltip={"Lire la phrase constituée mot par mot"}
        bgColor={"play_step"}
      />
      <LayoutManagementItem
        icon={<FaTrashCan size={"2rem"} />}
        textTooltip={"Supprimer les mots et pictogrammes sélectionnés"}
        bgColor={"delete"}
      />
      <LayoutManagementItem
        icon={<FaInfo size={"2rem"} />}
        textTooltip={"Comment utiliser l'application?"}
        bgColor={"legend"}
      />
      <Separator />
    </div>
  );
};

export default LayoutManagement;
