import { irregularId } from "@/_constants/types";

export const processAdjective = (
  word,
  prev,
  prevPrev,
  next,
  setPhraseToShow
) => {
  const key = [];
  irregularId(word.pictogram.tags)
    ? key.push("IRREGULIER")
    : key.push("REGULIER");
  switch (prev.pictogram.type) {
    case "DETERMINANT":
      // 0 - check if it is possible to place before nom
      if (!word.pictogram.tags.some((t) => t.title == "AVANT")) {
        setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
        break;
      }
      // 1 - check if there is nom after
      // 2 - insert according to number of determinant and genre of nom
      if (next && next.pictogram.type == "NOM") {
        fullAccordAdjective(key, word, next, prev);
        setPhraseToShow(
          (phrase) => phrase + " " + adjectiveMap(word)[key[0]][key[1]][key[2]]
        );
      } else {
        // treat for determinant only
        partialAccordAdjective(key, word, prev);
        console.log(adjectiveMap(word)[key[0]]["MASCULIN"][key[1]]);
        setPhraseToShow(
          (phrase) =>
            phrase + " " + adjectiveMap(word)[key[0]]["MASCULIN"][key[1]]
        );
      }
      break;
    case "NOM":
      // 0 - check if it is possible to place before nom
      if (!word.pictogram.tags.some((t) => t.title == "APRES")) {
        setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
        break;
      }
      // 1 - check if there is determinant before nom
      // 2 - insert according to number of determinant and genre of nom
      if (prevPrev && prevPrev.pictogram.type == "DETERMINANT") {
        fullAccordAdjective(key, prev, prevPrev);
        setPhraseToShow(
          (phrase) => phrase + " " + adjectiveMap(word)[key[0]][key[1]][key[2]]
        );
      } else {
        // treat for nom only
        partialAccordAdjective(key, prev);
        console.log(adjectiveMap(word)[key[0]][key[1]]["SINGULIER"]);
        setPhraseToShow(
          (phrase) =>
            phrase + " " + adjectiveMap(word)[key[0]][key[1]]["SINGULIER"]
        );
      }
      break;
    default:
      setPhraseToShow(word.pictogram.title + "!");
      break;
  }
};

const fullAccordAdjective = (key, nom, determinant) => {
  nom.pictogram.tags.some((t) => t.title == "MASCULIN") && key.push("MASCULIN");
  nom.pictogram.tags.some((t) => t.title == "FEMININ") && key.push("FEMININ");
  determinant.pictogram.tags.some((t) => t.title == "SINGULIER") &&
    key.push("SINGULIER");
  determinant.pictogram.tags.some((t) => t.title == "PLURIEL") &&
    key.push("PLURIEL");
  console.log(key);
};
const partialAccordAdjective = (key, prev) => {
  if (prev.pictogram.title == "NOM") {
    prev.pictogram.tags.some((t) => t.title == "MASCULIN") &&
      key.push("MASCULIN");
    prev.pictogram.tags.some((t) => t.title == "FEMININ") &&
      key.push("FEMININ");
  }
  if (prev.pictogram.title == "DETERMINANT") {
    prev.pictogram.tags.some((t) => t.title == "SINGULIER") &&
      key.push("SINGULIER");
    prev.pictogram.tags.some((t) => t.title == "PLURIEL") &&
      key.push("PLURIEL");
  }
  console.log(key);
};

const adjectiveMap = (word, aux) => ({
  REGULIER: {
    MASCULIN: {
      SINGULIER: word?.pictogram?.title,
      PLURIEL: word?.pictogram?.title + "s",
    },
    FEMININ: {
      SINGULIER: word?.pictogram?.title + "e",
      PLURIEL: word?.pictogram?.title + "es",
    },
  },
  IRREGULIER: {
    MASCULIN: {
      SINGULIER: word?.pictogram?.title,
      PLURIEL: word?.pictogram?.irregular?.plurial,
    },
    FEMININ: {
      SINGULIER: word?.pictogram?.irregular?.feminin,
      PLURIEL: word?.pictogram?.irregular?.femininPlurial,
    },
  },
});
