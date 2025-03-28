import { checkElision } from "./checkElision";
import { processAdjective } from "./processing/adjectiveProcessing";
import { processNom } from "./processing/nounProcessing";
import { processAuxVerb, processMainVerb } from "./processing/verbProcessing";

export const processPhrase = (
  phrase,
  setPhraseToShow,
  tense = "PRESENT",
  form = "AFFIRMATIVE"
) => {
  const words = phrase?.words;
  for (let i = 0; i < words?.length - 1; i++) {
    // first word
    if (i == 0 && words[i]) {
      if (
        words[i]?.pictogram.type == "PRONOM" ||
        words[i]?.pictogram.type == "DETERMINANT"
      ) {
        setPhraseToShow(
          words[i + 1]
            ? checkElision(
                words[i]?.pictogram.title.toLowerCase(),
                words[i + 1].pictogram,
                tense,
                form
              )
            : words[i]?.pictogram.title.toLowerCase()
        );
      } else {
        setPhraseToShow(words[i]?.pictogram.title.toLowerCase() + "! ");
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
        case "DETERMINANT":
          setPhraseToShow(
            (phrase) =>
              phrase +
              (words[i + 1]
                ? checkElision(
                    words[i]?.pictogram.title.toLowerCase(),
                    words[i + 1].pictogram,
                    tense,
                    form
                  )
                : words[i]?.pictogram.title.toLowerCase())
          );
          break;
        default:
          setPhraseToShow(
            (phrase) => phrase + words[i]?.pictogram.title.toLowerCase() + " "
          );
          break;
      }
    }
  }
};
