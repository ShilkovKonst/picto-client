import { irregularId } from "@/_constants/types";

export const processAuxVerb = (
  word,
  prev,
  prevPrev,
  prevPrevPrev,
  setPhraseToShow
) => {
  // check if it is not a main verb in a sentence
  switch (prev.pictogram.type) {
    case "VERBE":
      // check if determinant before nom before is in a row of un, une, le, la, les, des
      setPhraseToShow(
        (phrase) => phrase + " " + word.pictogram.title.toLowerCase()
      );
      return true;
    case "PREPOSITION":
      // check if preposition is in a row of de, à
      // and check if it is main verb before preposition
      if (
        ["de", "à"].some(
          (item) => item == prev.pictogram.title.toLowerCase()
        ) &&
        (prevPrev.pictogram.type == "VERBE" ||
          prevPrevPrev.pictogram.type == "VERBE")
      ) {
        setPhraseToShow(
          (phrase) => phrase + " " + word.pictogram.title.toLowerCase()
        );
        return true;
      }
      return false;
    default:
      return false;
  }
};

export const processMainVerb = (
  tense,
  words,
  index,
  j = 0,
  setPhraseToShow
) => {
  // if it is main verb - find subject and conjugate this verb
  const accordKey = {
    tense: tense,
    number: "",
    person: "",
    regular: "",
    aux: "",
  };
  accordVerb(accordKey, words[index], "aux", [
    "AUXILIAIRE_ETRE",
    "AUXILIAIRE_AVOIR",
  ]);
  if (irregularId(words[index].pictogram.tags)) {
    accordKey["regular"] = "IRREGULIER";
  } else {
    const firstWord = words[index].pictogram.title.split(" ")[0];
    const wordEnd = firstWord.split(" ")[0].slice(firstWord.length - 2);
    accordKey["regular"] = wordEnd == "er" ? "ER" : "IR";
  }
  switch (words[j].pictogram.type) {
    case "PRONOM":
      //conjugate according to number and person of pronom and tense of question
      if (j != 0) {
        setPhraseToShow(
          (phrase) => phrase + " " + words[index].pictogram.title + "!"
        );
        break;
      }
      formPhrase(accordKey, words, j, index, setPhraseToShow);
      break;
    case "NOM":
      // check if determinant before is in a row of un, une, le, la, les, des; if not -> go deeper
      for (let k = j - 1; k >= 0; k--) {
        if (words[k].pictogram.type != "DETERMINANT") {
          continue;
        }
        formPhrase(accordKey, words, k, index, setPhraseToShow);
        break;
      }
      break;
    default:
      if (j < index) {
        processMainVerb(tense, words, index, ++j, setPhraseToShow);
        break;
      }
      setPhraseToShow(
        (phrase) => phrase + " " + words[index].pictogram.title + "!"
      );
      break;
  }
};

const accordVerb = (accordKey, word, key, values) => {
  for (let i = 0; i < values.length; i++) {
    if (word.pictogram.tags.some((t) => t.title == values[i]))
      accordKey[key] = values[i];
  }
};

const formPhrase = (accordKey, words, k, index, setPhraseToShow) => {
  accordVerb(accordKey, words[k], "number", ["SINGULIER", "PLURIEL"]);
  accordVerb(accordKey, words[k], "person", [
    "PREMIER",
    "DEUXIEME",
    "TROISIEME",
  ]);
  if (accordKey.tense == "PASSE") {
    setPhraseToShow(
      (phrase) =>
        phrase +
        " " +
        auxMap[accordKey.aux][accordKey.number][accordKey.person] +
        " " +
        verbMap(words[index])["PAST_PARTICIPLE"][accordKey.regular]
    );
  } else {
    setPhraseToShow(
      (phrase) =>
        phrase +
        " " +
        verbMap(words[index])[accordKey.tense][accordKey.number][
          accordKey.person
        ][accordKey.regular]
    );
  }
};

const verbMap = (word) => ({
  PRESENT: {
    SINGULIER: {
      PREMIER: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "e",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "is",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["PRESENT_SINGULIER_PREMIER"],
      },
      DEUXIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "es",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "is",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations[
            "PRESENT_SINGULIER_DEUXIEME"
          ],
      },
      TROISIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "e",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "it",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations[
            "PRESENT_SINGULIER_TROISIEME"
          ],
      },
    },
    PLURIEL: {
      PREMIER: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "ons",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "issons",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["PRESENT_PLURIEL_PREMIER"],
      },
      DEUXIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "ez",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "issez",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["PRESENT_PLURIEL_DEUXIEME"],
      },
      TROISIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "ent",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "issent",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["PRESENT_PLURIEL_TROISIEME"],
      },
    },
  },
  FUTUR: {
    SINGULIER: {
      PREMIER: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "erai",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "irai",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["FUTUR_SINGULIER_PREMIER"],
      },
      DEUXIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "eras",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "iras",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["FUTUR_SINGULIER_DEUXIEME"],
      },
      TROISIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "era",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "ira",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["FUTUR_SINGULIER_TROISIEME"],
      },
    },
    PLURIEL: {
      PREMIER: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "erons",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "irons",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["FUTUR_PLURIEL_PREMIER"],
      },
      DEUXIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "erez",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "irez",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["FUTUR_PLURIEL_DEUXIEME"],
      },
      TROISIEME: {
        ER:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "eront",
        IR:
          word?.pictogram?.title
            ?.toLowerCase()
            ?.slice(0, word?.pictogram?.title.length - 2) + "iront",
        IRREGULIER:
          word?.pictogram?.irregular?.conjugations["FUTUR_PLURIEL_TROISIEME"],
      },
    },
  },
  PAST_PARTICIPLE: {
    ER:
      word?.pictogram?.title
        ?.toLowerCase()
        ?.slice(0, word?.pictogram?.title.length - 2) + "é",
    IR:
      word?.pictogram?.title
        ?.toLowerCase()
        ?.slice(0, word?.pictogram?.title.length - 2) + "i",
    IRREGULIER: word?.pictogram?.irregular?.pastParticiple?.toLowerCase(),
  },
});
const auxMap = {
  AUXILIAIRE_ETRE: {
    SINGULIER: {
      PREMIER: "suis",
      DEUXIEME: "es",
      TROISIEME: "est",
    },
    PLURIEL: {
      PREMIER: "sommes",
      DEUXIEME: "êtes",
      TROISIEME: "sont",
    },
  },
  AUXILIAIRE_AVOIR: {
    SINGULIER: {
      PREMIER: "ai",
      DEUXIEME: "as",
      TROISIEME: "a",
    },
    PLURIEL: {
      PREMIER: "avons",
      DEUXIEME: "avez",
      TROISIEME: "ont",
    },
  },
};
