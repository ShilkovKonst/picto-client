import { processAdjective } from "./adjectiveProcessing";
import { processNom } from "./nounProcessing";
import { processAuxVerb, processMainVerb } from "./verbProcessing";

export const processPhrase = (phrase, setPhraseToShow, tense ="PRESENT", form = "POSITIVE") => {
  const words = phrase?.words;
  for (let i = 0; i < words?.length - 1; i++) {
    console.log("words[i]?.pictogram.type", words[i]?.pictogram.type);
    // first word
    if (i == 0) {
      if (
        words[i]?.pictogram.type == "PRONOM" ||
        words[i]?.pictogram.type == "DETERMINANT"
      ) {
        words[i] && setPhraseToShow(words[i]?.pictogram.title.toLowerCase());
      } else {
        words[i] && setPhraseToShow(words[i]?.pictogram.title.toLowerCase() + "!");
      }
    } else {
      switch (words[i]?.pictogram.type) {
        case "NOM":
          processNom(words[i], words[i - 1], words[i - 2], setPhraseToShow);
          break;
        case "ADJECTIF":
          processAdjective(
            words[i],
            words[i - 1],
            words[i - 2],
            words[i + 1],
            setPhraseToShow
          );
          break;
        case "VERBE":
          !processAuxVerb(
            words[i],
            words[i - 1],
            words[i - 2],
            words[i - 3],
            setPhraseToShow
          ) && processMainVerb(tense, form, words, i, 0, setPhraseToShow);
          break;
        default:
          setPhraseToShow((phrase) => phrase + " " + words[i]?.pictogram.title.toLowerCase());
          break;
      }
    }
  }
};
