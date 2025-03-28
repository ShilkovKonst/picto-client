import { textToSpeech, textToSpeechStep } from "@/_lib/textToSpeech";

const LayoutManagementItem = ({
  icon,
  phrase,
  setPhrase,
  setTense,
  setForm,
  textTooltip,
  usage,
  setIsOpen,
  selected,
  stepPlayId,
  setStepPlayId,
}) => {
  const phraseSplitted = phrase?.split(" ")?.filter((e) => e != "");
  const handleClick = () => {
    switch (usage) {
      case "play":
        textToSpeech(phrase);
        break;
      case "step_play":
        textToSpeechStep(phraseSplitted, stepPlayId, setStepPlayId);
        break;
      case "tense_past":
        setTense("PASSE");
        break;
      case "tense_present":
        setTense("PRESENT");
        break;
      case "tense_future":
        setTense("FUTUR");
        break;
      case "affirmative_form":
        setForm("AFFIRMATIVE");
        break;
      case "negative_form":
        setForm("NEGATIVE");
        break;
      case "delete":
        setPhrase({
          text: null,
          words: Array(1).fill(null),
          audio: null,
        });
        break;
      default:
        console.log(usage);
        setIsOpen(true);
        break;
    }
  };
  return (
    <button
      onClick={handleClick}
      title={textTooltip}
      className={`text-white ${
        usage.split("_")[0]
      } w-12 h-12 border rounded-full ${
        selected && "border-2 !border-black border-dotted"
      } transition ease-in-out duration-300`}
    >
      <div className={`flex justify-center items-center`}>{icon}</div>
    </button>
  );
};

export default LayoutManagementItem;
