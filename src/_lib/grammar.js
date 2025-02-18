import { irregularId } from "../_constants/types";

const grammar = (phrase) => {
  const words = phrase.words;
  for (let i = 0; i < words.length; i++) {
    //  non interrogative phrase:
    //      first word processing:
    //      1)  pronom, determinant, nombre, invariable - ok, insert title
    //      3)  other cases - not ok, insert title with warning
    //
    //      second word processing:
    //      1)  nom - ok if previous word is determinant or nombre,
    //          insert title conformed with determinants number and check conformity of genres
    //      2)  verbe -  ok if previous word is pronom,
    //          insert conjugation form conformed with pronoms number and person and questions tense
    //      3)  adjectif - ok if stands after determinant and can be placed before nom,
    //          insert title conformed with determinants genre and number
    //      4)  other cases - not ok, insert title with warning
    //
    //      third word processing:
    //      1)  verbe - ok if previous word is nom,
    //          insert conjugation form conformed with noms determinants number and questions tense,
    //          always third person
    //      1a) verbe - ok if previous word is verbe, insert title
    //      2)  adjectif - ok if previous word is nom or verbe, insert title conformed with determinants genre and number
    //      3)  determinant, invariable, nombre - ok if previous word is verbe or not the same type, insert title
    //
    //=======================================================================================================
    //  interrogative phrase:
    //      first word processing:
    //      1)  verbe - ok if next word is pronoun,
    //          insert conjugation form conformed with pronoms number and person and questions tense
    //      2)  interrogatif - ok, insert title
    //      3)  pronom, determinant, nombre, invariable - ok if phrase ends with question mark, insert title
    //
    //      second word processing:
    //      1)  pronom, determinant - ok if previous word is verbe, insert title
    //      2)  verbe - ok if previous word is interrogative and next is pronom,
    //          insert conjugation form conformed with pronoms number and person and questions tense
    //      2a) verbe - ok if previous word is "qui", alwais "être" in tense of question and third person conjugation
    //      3)  nom - ok, if previous word is "quel(s)/quelle(s)", insert title conformed with number
    //
    //      third word processing:
    //      1)  interrogatif - ok if previous word is pronom, insert title
    //      2)  determinant - ok if previous word is verbe, insert title
    //      3)  pronom - ok if previous word is verbe, insert title
    //      4)  verbe - ok if previous word is nom and next is pronom,
    //          insert conjugation form conformed with pronoms number and person and questions tense
    //
    // 4)   other cases - not ok, insert title with warning
  }
};

export const processPhrase = (phrase, setPhraseToShow, question) => {
  const words = phrase?.words;
  for (let i = 0; i < words.length - 1; i++) {
    console.log("words[i]?.pictogram.type", words[i]?.pictogram.type);
    // first word
    if (i == 0) {
      console.log("words[i]?.pictogram.type", words[i]?.pictogram.type);
      if (
        words[i]?.pictogram.type == "PRONOM" ||
        words[i]?.pictogram.type == "DETERMINANT"
      ) {
        words[i] && setPhraseToShow(words[i]?.pictogram.title);
      } else {
        words[i] && setPhraseToShow(words[i]?.pictogram.title + "!");
      }
    } else {
      console.log("words[i]?.pictogram.type", words[i]?.pictogram.type);
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
        default:
          setPhraseToShow(
            (phraseToShow) => phraseToShow + " " + words[i]?.pictogram.title
          );
          break;
      }
    }
  }
};

const processNom = (word, prev, prevPrev, setPhraseToShow) => {
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
        const key = [];
        prev.pictogram.tags.some((pTag) => pTag.title == "SINGULIER") &&
          key.push("SINGULIER");
        prev.pictogram.tags.some((pTag) => pTag.title == "PLURIEL") &&
          key.push("PLURIEL");
        if (key[0] == "SINGULIER") {
          setPhraseToShow(
            (phraseToShow) => phraseToShow + " " + nomMap(word)[key[0]]
          );
          break;
        }
        irregularId(word.pictogram.tags)
          ? key.push("IRREGULIER")
          : key.push("REGULIER");
        console.log(key);
        if (key[0] == "PLURIEL") {
          if (key[1] == "IRREGULIER") {
            console.log(key);
            setPhraseToShow(
              (phraseToShow) =>
                phraseToShow + " " + nomMap(word)[key[0]][key[1]]
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
            console.log(wordEnd);
            console.log(key);
            setPhraseToShow(
              (phraseToShow) =>
                phraseToShow + " " + nomMap(word)[key[0]][key[1]][key[2]]
            );
          }
        }
      } else {
        // if not - TODO error logic
        setPhraseToShow(
          (phraseToShow) => phraseToShow + " " + word.pictogram.title + "!"
        );
      }
      break;
    case "ADJECTIF":
      // 2 - check if word before adjectif is determinant -> *1
      if (prevPrev && prevPrev?.pictogram.type == "DETERMINANT") {
        processNom(word, prevPrev, null, setPhraseToShow);
      } else {
        setPhraseToShow(
          (phraseToShow) => phraseToShow + " " + word.pictogram.title + "!"
        );
      }
      break;
    default:
      setPhraseToShow(
        (phraseToShow) => phraseToShow + " " + word.pictogram.title + "!"
      );
      break;
  }
};

const processAdjective = (word, prev, prevPrev, next, setPhraseToShow) => {
  switch (prev.pictogram.type) {
    case "DETERMINANT":
      // 0 - check if it is possible to place before nom
      if (!word.pictogram.tags.some((t) => t.title == "AVANT")) {
        setPhraseToShow(
          (phraseToShow) => phraseToShow + " " + word.pictogram.title + "!"
        );
        break;
      }
      // 1 - check if there is nom after
      // 2 - insert according to number of determinant and genre of nom
      const key = [];
      if (next) {
        irregularId(word.pictogram.tags)
          ? key.push("IRREGULIER")
          : key.push("REGULIER");
        next.pictogram.tags.some((t) => t.title == "MASCULIN") &&
          key.push("MASCULIN");
        next.pictogram.tags.some((t) => t.title == "FEMININ") &&
          key.push("FEMININ");
        prev.pictogram.tags.some((t) => t.title == "SINGULIER") &&
          key.push("SINGULIER");
        prev.pictogram.tags.some((t) => t.title == "PLURIEL") &&
          key.push("PLURIEL");
        console.log(key);
        console.log(adjectiveMap(word)[key[0]][key[1]][key[2]]);
        setPhraseToShow(
          (phraseToShow) =>
            phraseToShow + " " + adjectiveMap(word)[key[0]][key[1]][key[2]]
        );
        //========================================================================
      } else {
        // treat for determinant only
        irregularId(word.pictogram.tags)
          ? key.push("IRREGULIER")
          : key.push("REGULIER");
        prev.pictogram.tags.some((t) => t.title == "SINGULIER") &&
          key.push("SINGULIER");
        prev.pictogram.tags.some((t) => t.title == "PLURIEL") &&
          key.push("PLURIEL");
        console.log(key);
        console.log(adjectiveMap(word)[key[0]]["MASCULIN"][key[1]]);
        setPhraseToShow(
          (phraseToShow) =>
            phraseToShow + " " + adjectiveMap(word)[key[0]]["MASCULIN"][key[1]]
        );
      }
      break;
    case "NOM":
      // 2 - check if word before is determinant, *1
      break;
    default:
      setPhraseToShow(word.pictogram.title + "!");
      break;
  }
};

const nomMap = (word) => ({
  SINGULIER: word?.pictogram?.title,
  PLURIEL: {
    IRREGULIER: word?.pictogram?.irregular?.plurial,
    REGULIER: {
      IMMUTABLE: word?.pictogram?.title,
      PLUPART: word?.pictogram?.title
        ?.split(" ")
        ?.map((item, i) => (i == 0 ? item + "s" : item))
        ?.join(" "),
      AU_EU: word?.pictogram?.title
        ?.split(" ")
        ?.map((item, i) => (i == 0 ? item + "x" : item))
        ?.join(" "),
      AL: word?.pictogram?.title
        ?.split(" ")
        ?.map((item, i) =>
          i == 0 ? item.slice(0, item.length - 1) + "ux" : item
        )
        ?.join(" "),
    },
  },
});

const adjectiveMap = (word) => ({
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

const processVerb = (word, prev, setPhraseToShow) => {
  switch (prev.pictogram.type) {
    case "PRONOM":
      //conjugate according to number and person of pronom and tense of question
      break;
    case "NOM":
      // 1 - check previous words if there is the preposition in a row de, à exists
      // 2a - if not - check if determinant before is in a row of un, une, le, la, les, des; if not -> go deeper
      break;
    case "ADJECTIF":
      // 2 - check if word before is nom -> *1
      break;
    case "VERBE":
      // check if determinant before nom before is in a row of un, une, le, la, les, des
      break;
    case "PREPOSITION":
      // check if preposition is in a row of de, à
      break;
    default:
      setPhraseToShow(word.pictogram.title + "!");
      break;
  }
};
