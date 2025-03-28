import {
  FaCircleMinus,
  FaCirclePlus,
  FaForwardStep,
  FaInfo,
  FaPlay,
  FaRightToBracket,
  FaRotate,
  FaTrashCan,
} from "react-icons/fa6";
import Separator from "../shared/Separator";
import images from "@/_constants/images";
import { ImageIcon } from "./LayoutManagement";

const LayoutLegendModal = ({ seanceType, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-30">
          <div
            onClick={() => setIsOpen(false)}
            className="fixed top-0 left-0 bg-black opacity-50 w-full h-full"
          ></div>
          <article className="fixed top-[10%] left-[10%] flex flex-col justify-center items-center w-[80%] bg-white p-3 rounded-3xl">
            <header className="pb-3">
              <h2 className="font-bold text-xl text-center">
                Comment utiliser l'application?
              </h2>
            </header>
            <Separator />
            <section className="py-3">
              {seanceType == "dialogue" && (
                <LegendDescription
                  title={"Dialogue"}
                  text={
                    <>
                      <p>La première ligne est la liste des questions.</p>
                      <p>
                        Il faut choisir l'une d'entre elles pour charger les
                        pictogrammes correspondants.
                      </p>
                    </>
                  }
                />
              )}
              {seanceType == "exchange" && (
                <LegendDescription
                  title={"Echange"}
                  text={
                    <>
                      <p>
                        La première ligne correspond aux différentes catégories
                      </p>
                      <p>
                        Appuyez dessus pour voir apparaître en dessous les
                        pictogrammes qui lui sont associés.
                      </p>
                    </>
                  }
                />
              )}
              <p>Cliquez sur un pictogramme pour entendre le mot.</p>
              <p>
                Déplacez le pictogramme de votre choix à l'aide de la souris ou
                du doigt sur les zones dédiées pour composer la phrase.
              </p>
              <LegendItem
                icon={<FaRightToBracket size={20} />}
                text={"Zones de réception de pictogrammes."}
                usage={"depose"}
              />
              <LegendItem
                icon={<FaRotate size={20} />}
                text={"Zones d'échange de pictogrammes."}
              />
              <p>Les mots apparaissent!</p>
              <p className="font-semibold py-2">
                Plusieurs choix s'offrent à vous:
              </p>
              <div className="flex flex-col gap-2">
                <LegendItemButton
                  icon={<FaPlay size={20} />}
                  text={"Lire la phrase constituée"}
                  usage={"play"}
                />
                <LegendItemButton
                  icon={<FaForwardStep size={20} />}
                  text={"Lire la phrase constituée mot par mot"}
                  usage={"step_play"}
                />
                {seanceType == "exchange" && (
                  <>
                    <Separator />
                    <LegendItemButton
                      icon={
                        <ImageIcon
                          image={images.past.src}
                          alt={images.past.alt}
                        />
                      }
                      text={"Mettre la phrase au passé"}
                      usage={"tense_past"}
                    />
                    <LegendItemButton
                      icon={
                        <ImageIcon
                          image={images.present.src}
                          alt={images.present.alt}
                        />
                      }
                      text={"Mettre la phrase au présent"}
                      usage={"tense_present"}
                    />
                    <LegendItemButton
                      icon={
                        <ImageIcon
                          image={images.future.src}
                          alt={images.future.alt}
                        />
                      }
                      text={"Mettre la phrase au futur"}
                      usage={"tense_future"}
                    />
                  </>
                )}
                <Separator />
                <LegendItemButton
                  icon={<FaCirclePlus size={20} />}
                  text={"Mettre la phrase a la forme affirmative"}
                  usage={"affirmative_form"}
                />
                <LegendItemButton
                  icon={<FaCircleMinus size={20} />}
                  text={"Mettre la phrase a la forme négative"}
                  usage={"negative_form"}
                />
                <Separator />
                <LegendItemButton
                  icon={<FaTrashCan size={20} />}
                  text={"Supprimer les mots et les pictogrammes sélectionnés"}
                  usage={"delete"}
                />
              </div>
            </section>
            <Separator />
            <footer className="pt-3">
              <button
                className="font-bold text-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                Compris!
              </button>
            </footer>
          </article>
        </div>
      )}
    </>
  );
};

export default LayoutLegendModal;

const LegendDescription = ({ title, text }) => {
  return (
    <>
      <h3 className="font-bold text-lg text-center">{title}</h3>
      {text}
    </>
  );
};

const LegendItem = ({ icon, text, usage }) => {
  return (
    <div className="flex items-center gap-2 py-1">
      <div
        className={`relative flex justify-center items-center overflow-hidden h-[2.125rem] w-[2.125rem] rounded-xl border-2 border-primary`}
      >
        <div
          className={`absolute h-[2rem] w-[2rem] right-0 top-0 flex items-center justify-center font-bold rounded-bl-xl border-l-2 border-b-2 bg-white ${
            usage == "depose" ? "text-primary rotate-90" : "text-secondary"
          }`}
        >
          {icon}
        </div>
      </div>
      {text}
    </div>
  );
};

const LegendItemButton = ({ icon, text, usage }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex justify-center items-center text-white ${
          usage.split("_")[0]
        } w-8 h-8 border rounded-full`}
      >
        {icon}
      </span>
      {text}
    </div>
  );
};
