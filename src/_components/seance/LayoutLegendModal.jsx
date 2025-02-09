import {
  FaForwardStep,
  FaInfo,
  FaPlay,
  FaRightToBracket,
  FaRotate,
  FaTrashCan,
} from "react-icons/fa6";
import Separator from "../shared/Separator";

const LayoutLegendModal = ({ isOpen, setIsOpen }) => {
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
              <h3 className="font-bold text-lg text-center">Dialogue</h3>
              <p>La première ligne est la liste des questions.</p>
              <p>
                Il faut choisir l'une d'entre elles pour charger les
                pictogrammes correspondants.
              </p>
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
                  icon={<FaPlay size={"1rem"} />}
                  text={"Lire la phrase constituée"}
                  usage={"play"}
                />
                <LegendItemButton
                  icon={<FaForwardStep size={"1rem"} />}
                  text={"Lire la phrase constituée mot par mot"}
                  usage={"play_step"}
                />
                <LegendItemButton
                  icon={<FaTrashCan size={"1rem"} />}
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
        className={`flex justify-center items-center text-white ${usage} w-6 h-6 border rounded-full`}
      >
        {icon}
      </span>
      {text}
    </div>
  );
};
