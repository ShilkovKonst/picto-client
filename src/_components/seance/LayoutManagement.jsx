"use client";
import {
  FaCircleMinus,
  FaCirclePlus,
  FaForwardStep,
  FaInfo,
  FaPlay,
  FaTrashCan,
} from "react-icons/fa6";
import Separator from "../shared/Separator";
import LayoutManagementItem from "./LayoutManagementItem";
import { SeanceContext } from "@/_context/SeanceContext";
import { useContext } from "react";
import Image from "next/image";
import images from "@/_constants/images";

const LayoutManagement = ({ setIsOpen }) => {
  const { phraseToShow, setPhrase, tense, setTense, form, setForm } =
    useContext(SeanceContext);

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
        usage={"step_play"}
      />
      <Separator />
      {/* tenses */}
      <LayoutManagementItem
        icon={<ImageIcon image={images.past.src} alt={images.past.alt} />}
        textTooltip={"Mettre la phrase au passé"}
        usage={"tense_past"}
        tense={tense}
        setTense={setTense}
        selected={tense == "PASSE"}
      />
      <LayoutManagementItem
        icon={<ImageIcon image={images.present.src} alt={images.present.alt} />}
        textTooltip={"Mettre la phrase au présent"}
        usage={"tense_present"}
        tense={tense}
        setTense={setTense}
        selected={tense == "PRESENT"}
      />
      <LayoutManagementItem
        icon={<ImageIcon image={images.future.src} alt={images.future.alt} />}
        textTooltip={"Mettre la phrase au futur"}
        usage={"tense_future"}
        tense={tense}
        setTense={setTense}
        selected={tense == "FUTUR"}
      />
      <Separator />
      {/* affirmative/negative form */}
      <LayoutManagementItem
        icon={<FaCirclePlus size={"2rem"} />}
        textTooltip={"Mettre la phrase a la forme affirmative"}
        usage={"affirmative_form"}
        form={form}
        setForm={setForm}
        selected={form == "AFFIRMATIVE"}
      />
      <LayoutManagementItem
        icon={<FaCircleMinus size={"2rem"} />}
        textTooltip={"Mettre la phrase a la forme négative"}
        usage={"negative_form"}
        form={form}
        setForm={setForm}
        selected={form == "NEGATIVE"}
      />
      <Separator />
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

const ImageIcon = ({ image, alt }) => {
  return (
    <Image
      className="cursor-pointer"
      src={image}
      alt={alt}
      width={46}
      height={46}
    />
  );
};
