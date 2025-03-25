import { adjEndingMap } from "@/_constants/adjMap";
import { irregularId } from "@/_constants/types";
import { auxMap, pronominalMap, verbEndingMap } from "@/_constants/verbMaps";
import { checkElision, checkVerbElision } from "../checkElision";
import { findTag } from "../findTag";

/**
 * Processes an auxiliary verb in a sentence.
 * Checks if the previous pictogram is a verb or a preposition followed by a verb.
 * If the conditions are met, adds the auxiliary verb to the phrase and returns true.
 * Otherwise, returns false.
 *
 * @param {Object} word - The current word object containing the pictogram.
 * @param {Object} prev - The previous word object.
 * @param {Object} prevPrev - The word object before the previous word.
 * @param {Object} prevPrevPrev - The word object before the prevPrev word.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 * @returns {boolean} - True if the auxiliary verb is processed, false otherwise.
 */
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
        (phrase) => phrase + word.pictogram.title.toLowerCase() + " "
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
          (phrase) => phrase + word.pictogram.title.toLowerCase() + " "
        );
        return true;
      }
      return false;
    default:
      return false;
  }
};

/**
 * Processes the main verb in a sentence.
 * Finds the subject and conjugates the verb accordingly.
 * Updates the phrase to show with the conjugated verb.
 *
 * @param {string} tense - The tense of the verb.
 * @param {string} form - The form of the verb (e.g., affirmative, negative).
 * @param {Array} words - The array of word objects in the sentence.
 * @param {number} index - The index of the main verb in the words array.
 * @param {number} [j=0] - The current index being processed.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 */
export const processMainVerb = (
  tense = "PRESENT",
  form = "AFFIRMATIVE",
  words,
  index,
  j = 0,
  setPhraseToShow
) => {
  // if it is main verb - find subject and conjugate this verb
  const wordPicto = words[index].pictogram;
  const accordKey = {
    form: form,
    tense: tense,
    genre: "",
    number: "",
    person: "",
    regular: "",
    aux: "",
  };
  setAccordKey(wordPicto, accordKey, "aux", [
    "AUXILIAIRE_ETRE",
    "AUXILIAIRE_AVOIR",
  ]);
  setAccordKey(wordPicto, accordKey, "regular");
  switch (words[j].pictogram.type) {
    case "PRONOM":
      //conjugate according to number and person of pronom and tense of question
      if (j != 0) {
        setPhraseToShow((phrase) => phrase + wordPicto.title + "! ");
        break;
      }
      setAccordKey(words[j].pictogram, accordKey, "genre", [
        "MASCULIN",
        "FEMININ",
        "INDIFFERENT",
      ]);
      formPhrase(accordKey, words, j, index, setPhraseToShow);
      break;
    case "NOM":
      // check if determinant before is in a row of un, une, le, la, les, des; if not -> go deeper
      for (let k = j - 1; k >= 0; k--) {
        if (words[k].pictogram.type != "DETERMINANT") {
          continue;
        }
        setAccordKey(words[k].pictogram, accordKey, "genre", [
          "MASCULIN",
          "FEMININ",
          "INDIFFERENT",
        ]);
        formPhrase(accordKey, words, k, index, setPhraseToShow);
        break;
      }
      break;
    default:
      if (j < index) {
        processMainVerb(tense, form, words, index, ++j, setPhraseToShow);
        break;
      }
      setPhraseToShow((phrase) => phrase + wordPicto.title + "! ");
      break;
  }
  console.log(accordKey);
};

/**
 * Forms a phrase by setting the number and person in the accordKey object based on the subject's pictogram.
 * Updates the phrase with the conjugated verb using the formVerb function.
 *
 * @param {Object} accordKey - The object containing conjugation details.
 * @param {Array} words - The array of word objects in the sentence.
 * @param {number} k - The index of the subject in the words array.
 * @param {number} index - The index of the main verb in the words array.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 */
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
    (phrase) => phrase + formVerb(words[index].pictogram, accordKey) + " "
  );
};

/**
 * Sets a specific key in the accordKey object based on the pictogram's properties.
 * If the key is "regular", checks if the verb is irregular and sets the value accordingly.
 * For other keys, checks if the pictogram's tags match any of the provided values and sets the key to the matching value.
 *
 * @param {Object} picto - The pictogram object containing the word details.
 * @param {Object} accordKey - The object containing conjugation details.
 * @param {string} key - The key to set in the accordKey object.
 * @param {Array} values - The array of possible values for the key.
 */
const setAccordKey = (picto, accordKey, key, values) => {
  if (key == "regular") {
    if (irregularId(picto?.tags)) {
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
      if (picto?.tags.some((t) => t.title == values[i]))
        accordKey[key] = values[i];
    }
  }
};

/**
 * Checks if a verb is pronominal by comparing it to "se" or "s".
 * Returns true if the verb matches either of these values, indicating that it is a pronominal verb.
 *
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word is pronominal, false otherwise.
 */
const isPronominal = (word) =>
  word.toLowerCase() == "se" || word.toLowerCase() == "s";

/**
 * Conjugates a verb based on the accordKey object.
 * Handles both regular and irregular verbs and considers the tense, form, person, and number.
 * For past tense, uses auxiliary verbs and past participles.
 * For other tenses, uses the appropriate conjugation endings.
 *
 * @param {string} word - The word to conjugate.
 * @param {Object} picto - The pictogram object containing the word details.
 * @param {Object} accordKey - The object containing conjugation details.
 * @returns {string} - The conjugated verb.
 */
const verbing = (word, picto, accordKey) => {
  const { form, tense, genre, person, number, regular, aux } = accordKey;
  if (tense == "PASSE") {
    return regular == "IRREGULIER"
      ? auxMap[aux][number][person] +
          (form == "NEGATIVE" ? " pas " : " ") +
          picto.irregular?.pastParticiple?.toLowerCase() +
          (aux == "AUXILIAIRE_ETRE" ? adjEndingMap[genre][number] : "")
      : auxMap[aux][number][person] +
          (form == "NEGATIVE" ? " pas " : " ") +
          word.toLowerCase().slice(0, word.length - 2) +
          verbEndingMap["PAST_PARTICIPLE"][regular] +
          (aux == "AUXILIAIRE_ETRE" ? adjEndingMap[genre][number] : "");
  }
  return regular == "IRREGULIER"
    ? picto?.irregular?.conjugations[`${tense}_${number}_${person}`] +
        (form == "NEGATIVE" ? " pas " : " ")
    : word.toLowerCase().slice(0, word.length - 2) +
        verbEndingMap[tense][number][person][regular] +
        (form == "NEGATIVE" ? " pas " : " ");
};

/**
 * Forms a verb phrase by splitting the verb title into its components and conjugating each part based on the accordKey object.
 * Handles pronominal verbs and negative forms, ensuring that the correct conjugation and structure are applied to the verb phrase.
 *
 * @param {Object} picto - The pictogram object containing the word details.
 * @param {Object} accordKey - The object containing conjugation details.
 * @returns {string} - The formed verb phrase.
 */
const formVerb = (picto, accordKey) => {
  const { tense, form, person, number } = accordKey;
  const verbSplitted = picto.title?.split(/['\s]/);
  const verbProcessed = verbSplitted
    ?.map((word, i) => {
      if (i == 0) {
        if (isPronominal(word)) {
          return (
            (form == "NEGATIVE" ? "ne " : "") + pronominalMap[number][person]
          );
        }
        return (
          (form == "NEGATIVE" ? "ne " : "") + verbing(word, picto, accordKey)
        );
      }
      if (i == 1 && isPronominal(verbSplitted[0])) {
        return verbing(word, picto, accordKey);
      }
      return (form == "NEGATIVE" ? "ne " : "") + word;
    })
    .join(" ")
    .trim()
    .split(" ");
  console.log(verbProcessed);
  const verbElisioned =
    verbProcessed.length > 1
      ? verbProcessed
          .map((e, i) =>
            i < verbProcessed.length - 1
              ? checkVerbElision(
                  verbProcessed[i],
                  verbProcessed[i + 1],
                  picto.tags
                )
              : verbProcessed[i]
          )
          .join("")
      : verbProcessed.join(" ");

  console.log(verbElisioned);
  for (let i = 0; i < verbProcessed.length - 1; i++) {}
  return verbElisioned;
};
