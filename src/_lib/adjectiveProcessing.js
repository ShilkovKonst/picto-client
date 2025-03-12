import { irregularId } from "@/_constants/types";

/**
 * Processes an adjective in a sentence.
 * Determines the correct form of the adjective based on the surrounding words and updates the phrase to show.
 *
 * @param {Object} word - The current word object containing the pictogram.
 * @param {Object} prev - The previous word object.
 * @param {Object} prevPrev - The word object before the previous word.
 * @param {Object} next - The next word object.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 */
export const processAdjective = (
  word,
  prev,
  prevPrev,
  next,
  setPhraseToShow
) => {
  const accordKey = {
    genre: "",
    number: "",
    regular: "",
  };
  accordKey["regular"] = irregularId(word.pictogram.tags) ? false : true;
  switch (prev.pictogram.type) {
    case "DETERMINANT":
      if (!word.pictogram.tags.some((t) => t.title == "AVANT")) {
        setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
        break;
      }
      if (next && next.pictogram.type == "NOM") {
        formPhrase(
          word.pictogram,
          next.pictogram,
          prev.pictogram,
          accordKey,
          setPhraseToShow
        );
      } else {
        formPhrase(
          word.pictogram,
          null,
          prev.pictogram,
          accordKey,
          setPhraseToShow
        );
      }
      break;
    case "NOM":
      if (!word.pictogram.tags.some((t) => t.title == "APRES")) {
        setPhraseToShow((phrase) => phrase + " " + word.pictogram.title + "!");
        break;
      }
      if (prevPrev && prevPrev.pictogram.type == "DETERMINANT") {
        formPhrase(
          word.pictogram,
          prev.pictogram,
          prevPrev.pictogram,
          accordKey,
          setPhraseToShow
        );
      } else {
        formPhrase(
          word.pictogram,
          prev.pictogram,
          null,
          accordKey,
          setPhraseToShow
        );
      }
      break;
    default:
      setPhraseToShow(word.pictogram.title + "!");
      break;
  }
};

/**
 * Forms a phrase with the correct adjective form.
 *
 * @param {Object} picto - The adjective pictogram object.
 * @param {Object} nounPicto - The noun pictogram object.
 * @param {Object} determPicto - The determiner pictogram object.
 * @param {Object} accordKey - The object containing conjugation details.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 */
const formPhrase = (
  picto,
  nounPicto,
  determPicto,
  accordKey,
  setPhraseToShow
) => {
  setAccordKey(nounPicto, determPicto, accordKey);
  setPhraseToShow((phrase) => phrase + " " + adjectiving(picto, accordKey));
};

/**
 * Conjugates an adjective based on the accordKey object.
 *
 * @param {Object} adjPicto - The adjective pictogram object.
 * @param {Object} accordKey - The object containing conjugation details.
 * @returns {string} - The conjugated adjective.
 */
const adjectiving = (adjPicto, accordKey) => {
  const lowerCased = adjPicto.title?.toLowerCase();
  const { genre, number, regular } = accordKey;
  if (regular) {
    return lowerCased + adjEndingMap[genre][number];
  }
  if (genre == "MASCULIN") {
    return number == "PLURIEL" ? adjPicto.irregular?.plurial : lowerCased;
  }
  if (genre == "FEMININ") {
    return number == "PLURIEL"
      ? adjPicto.irregular?.femininPlurial
      : adjPicto.irregular?.feminin;
  }
};

/**
 * Sets the accord key for an adjective based on the noun and determiner pictograms.
 *
 * @param {Object} nounPicto - The noun pictogram object.
 * @param {Object} determPicto - The determiner pictogram object.
 * @param {Object} accordKey - The object containing conjugation details.
 */
const setAccordKey = (nounPicto, determPicto, accordKey) => {
  accordKey["genre"] = nounPicto?.tags?.some((t) => t.title == "FEMININ")
    ? "FEMININ"
    : "MASCULIN";
  accordKey["number"] = determPicto?.tags?.some((t) => t.title == "PLURIEL")
    ? "PLURIEL"
    : "SINGULIER";
};

const adjEndingMap = {
  MASCULIN: {
    SINGULIER: "",
    PLURIEL: "s",
  },
  FEMININ: {
    SINGULIER: "e",
    PLURIEL: "es",
  },
};
