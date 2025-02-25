import { irregularId } from "@/_constants/types";

export const processNom = (word, prev, prevPrev, setPhraseToShow) => {
  const key = [];
  switch (prev.pictogram.type) {
    case "DETERMINANT":
      // 1 - check conformity of genre of nom and determinant or if it doesn't matter
      if (
        prev.pictogram.tags.some(
          (pTag) =>
            pTag.title == "INDIFFERENT" ||
            word.pictogram.tags.some((wTag) => wTag.title == pTag.title)
        )
      ) {
        // 2a - if ok: insert according to number of determinant
        prev.pictogram.tags.some((pTag) => pTag.title == "SINGULIER") &&
          key.push("SINGULIER");
        prev.pictogram.tags.some((pTag) => pTag.title == "PLURIEL") &&
          key.push("PLURIEL");
        if (key[0] == "SINGULIER") {
          setPhraseToShow((phrase) => phrase + " " + nomMap(word)[key[0]]);
          break;
        }
        irregularId(word.pictogram.tags)
          ? key.push("IRREGULIER")
          : key.push("REGULIER");
        console.log(key);
        if (key[0] == "PLURIEL") {
          if (key[1] == "IRREGULIER") {
            setPhraseToShow(
              (phrase) => phrase + " " + nomMap(word)[key[0]][key[1]]
            );
          }
          if (key[1] == "REGULIER") {
            const firstWord = word?.pictogram?.title?.split(" ")[0];
            const wordEnd = firstWord.slice(firstWord.length - 2);
            if (["au", "eu"].includes(wordEnd)) {
              key.push("AU_EU");
            } else if (wordEnd == "al") {
              key.push("AL");
            } else if (["s", "x", "z"].includes(wordEnd[1])) {
              key.push("IMMUTABLE");
            } else {
              key.push("PLUPART");
            }
            console.log(key);
            setPhraseToShow(
              (phrase) => phrase + " " + nomMap(word)[key[0]][key[1]][key[2]]
            );
          }
        }
      } else {
        // if not - TODO error logic
        setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
      }
      break;
    case "ADJECTIF":
      // 2 - check if word before adjectif is determinant -> *1
      if (prevPrev && prevPrev?.pictogram.type == "DETERMINANT") {
        processNom(word, prevPrev, null, setPhraseToShow);
      } else {
        setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
      }
      break;
    default:
      setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
      break;
  }
};

const nomMap = (word) => ({
  SINGULIER: word?.pictogram?.title?.toLowerCase(),
  PLURIEL: {
    IRREGULIER: word?.pictogram?.irregular?.plurial,
    REGULIER: {
      IMMUTABLE: word?.pictogram?.title?.toLowerCase(),
      PLUPART: word?.pictogram?.title
        ?.split(" ")
        ?.map((item, i) => (i == 0 ? item + "s" : item))
        ?.join(" ")
        .toLowerCase(),
      AU_EU: word?.pictogram?.title
        ?.split(" ")
        ?.map((item, i) => (i == 0 ? item + "x" : item))
        ?.join(" ")
        .toLowerCase(),
      AL: word?.pictogram?.title
        ?.split(" ")
        ?.map((item, i) =>
          i == 0 ? item.slice(0, item.length - 1) + "ux" : item
        )
        ?.join(" ")
        .toLowerCase(),
    },
  },
});
