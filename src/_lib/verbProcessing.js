import { irregularId } from "@/_constants/types";
import { auxMap, pronominalMap, verbEndingMap } from "@/_constants/verbMaps";

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
  form,
  words,
  index,
  j = 0,
  setPhraseToShow
) => {
  // if it is main verb - find subject and conjugate this verb
  const accordKey = {
    form: form,
    tense: tense,
    number: "",
    person: "",
    regular: "",
    aux: "",
  };
  setAccordKey(words[index].pictogram, accordKey, "aux", [
    "AUXILIAIRE_ETRE",
    "AUXILIAIRE_AVOIR",
  ]);
  setAccordKey(words[index].pictogram, accordKey, "regular");
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

const formPhrase = (accordKey, words, k, index, setPhraseToShow) => {
  setAccordKey(words[k].pictogram, accordKey, "number", [
    "SINGULIER",
    "PLURIEL",
  ]);
  setAccordKey(words[k].pictogram, accordKey, "person", [
    "PREMIER",
    "DEUXIEME",
    "TROISIEME",
  ]);
  setPhraseToShow(
    (phrase) => phrase + " " + formVerb(words[index].pictogram, accordKey)
  );
};

const setAccordKey = (picto, accordKey, key, values) => {
  if (key == "regular") {
    if (irregularId(picto.tags)) {
      accordKey[key] = "IRREGULIER";
    } else {
      const verbArray = picto.title.split(/['\s]/);
      const wordEnd = !isPronominal(verbArray[0])
        ? verbArray[0].slice(verbArray[0].length - 2)
        : verbArray[1].slice(verbArray[1].length - 2);
      accordKey["regular"] = wordEnd == "er" ? "ER" : "IR";
    }
  } else {
    for (let i = 0; i < values.length; i++) {
      if (picto.tags.some((t) => t.title == values[i]))
        accordKey[key] = values[i];
    }
  }
};

const isPronominal = (word) =>
  word.toLowerCase() == "se" || word.toLowerCase() == "s";

const verbing = (word, picto, accordKey) => {
  const { form, tense, person, number, regular, aux } = accordKey;
  if (tense == "PASSE") {
    return regular == "IRREGULIER"
      ? auxMap[aux][number][person] +
          (form == "NEGATIVE" ? " pas " : " ") +
          picto.irregular?.pastParticiple?.toLowerCase()
      : auxMap[aux][number][person] +
          (form == "NEGATIVE" ? " pas " : " ") +
          word.toLowerCase().slice(0, word.length - 2) +
          verbEndingMap["PAST_PARTICIPLE"][regular];
  }
  return regular == "IRREGULIER"
    ? picto?.irregular?.conjugations[`${tense}_${number}_${person}`] +
        (form == "NEGATIVE" ? " pas " : " ")
    : word.toLowerCase().slice(0, word.length - 2) +
        verbEndingMap[tense][number][person][regular] +
        (form == "NEGATIVE" ? " pas " : " ");
  if (tense == "PASSE") {
    return regular == "IRREGULIER"
      ? auxMap[aux][number][person] +
          " " +
          picto.irregular?.pastParticiple?.toLowerCase()
      : auxMap[aux][number][person] +
          " " +
          word.toLowerCase().slice(0, word.length - 2) +
          verbEndingMap["PAST_PARTICIPLE"][regular];
  }
  return regular == "IRREGULIER"
    ? picto?.irregular?.conjugations[`${tense}_${number}_${person}`]
    : word.toLowerCase().slice(0, word.length - 2) +
        verbEndingMap[tense][number][person][regular];
};

const formVerb = (picto, accordKey) => {
  const { form, person, number } = accordKey;
  const verbSplitted = picto.title?.split(/['\s]/);
  return verbSplitted
    ?.map((word, i) => {
      if (i == 0) {
        if (isPronominal(word)) {
          return (
            (form == "NEGATIVE" ? "ne " : " ") + pronominalMap[number][person]
          );
        }
        return (
          (form == "NEGATIVE" ? "ne " : " ") + verbing(word, picto, accordKey)
        );
      }
      if (i == 1 && isPronominal(verbSplitted[0])) {
        return verbing(word, picto, accordKey);
      }
      return (form == "NEGATIVE" ? "ne " : " ") + word;
    })
    .join(" ");
};
