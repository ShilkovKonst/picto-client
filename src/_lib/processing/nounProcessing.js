import { irregularId } from "@/_constants/types";

/**
 * Processes a noun in a sentence.
 * Determines the correct form of the noun based on the previous word and updates the phrase to show.
 *
 * @param {Object} word - The current word object containing the pictogram.
 * @param {Object} prev - The previous word object.
 * @param {Object} prevPrev - The word object before the previous word.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 */
export const processNom = (word, prev, prevPrev, setPhraseToShow) => {
  const accordKey = {
    number: "",
    regular: "",
  };

  switch (prev.pictogram.type) {
    case "DETERMINANT":
      if (!isNounConformed(word.pictogram, prev.pictogram)) {
        setPhraseToShow((phrase) => phrase + word.pictogram.title + "! ");
        break;
      }

      setAccordKey(word.pictogram, prev.pictogram, accordKey);
      const lowerCased = word?.pictogram?.title?.toLowerCase();
      if (accordKey.number == "SINGULIER") {
        setPhraseToShow((phrase) => phrase + lowerCased + " ");
        break;
      }
      if (accordKey.regular == "IRREGULIER") {
        setPhraseToShow(
          (phrase) => phrase + word?.pictogram?.irregular?.plurial + " "
        );
      } else {
        const lowerCasedSplitted = lowerCased.split(" ");
        const { regular } = accordKey;
        if (regular == "IMMUTABLE") {
          setPhraseToShow((phrase) => phrase + lowerCased + " ");
          break;
        }
        setPhraseToShow(
          (phrase) => phrase + nouning(lowerCasedSplitted, regular) + " "
        );
      }
      break;
    case "ADJECTIF":
      if (prevPrev && prevPrev?.pictogram.type == "DETERMINANT") {
        processNom(word, prevPrev, null, setPhraseToShow);
      } else {
        setPhraseToShow((phrase) => phrase + word.pictogram.title + "! ");
      }
      break;
    default:
      setPhraseToShow((phrase) => phrase + word.pictogram.title + "! ");
      break;
  }
};

/**
 * Processes a noun in a sentence.
 * Determines the correct form of the noun based on the previous word and updates the phrase to show.
 *
 * @param {Object} word - The current word object containing the pictogram.
 * @param {Object} prev - The previous word object.
 * @param {Object} prevPrev - The word object before the previous word.
 * @param {Function} setPhraseToShow - Function to update the phrase to show.
 */
const nouning = (splittedNoun, endingType) => {
  return splittedNoun
    ?.map((item, i) =>
      i == 0
        ? endingType == "AL"
          ? item.slice(0, item.length - 1) + nomEndingMap[endingType]
          : item + nomEndingMap[endingType]
        : item
    )
    ?.join(" ");
};

/**
 * Checks if a noun conforms to the previous word's tags.
 * Returns true if the noun's tags match the previous word's tags or if the previous word's tag is "INDIFFERENT".
 *
 * @param {Object} picto - The current word's pictogram object.
 * @param {Object} prevPicto - The previous word's pictogram object.
 * @returns {boolean} - True if the noun conforms, false otherwise.
 */
const isNounConformed = (picto, prevPicto) => {
  return prevPicto.tags.some(
    (pTag) =>
      pTag.title == "INDIFFERENT" ||
      picto.tags.some((wTag) => wTag.title == pTag.title)
  );
};

/**
 * Sets the accord key for a noun based on its properties and the previous word's tags.
 * Determines if the noun is regular or irregular and sets the appropriate pluralization rules.
 *
 * @param {Object} picto - The current word's pictogram object.
 * @param {Object} prevPicto - The previous word's pictogram object.
 * @param {Object} accordKey - The object to store the noun's conjugation details.
 */
const setAccordKey = (picto, prevPicto, accordKey) => {
  if (irregularId(picto.tags)) {
    accordKey["regular"] = "IRREGULIER";
  } else {
    const firstWord = picto.title?.split(" ")[0];
    const wordEnd = firstWord.slice(firstWord.length - 2);
    if (["s", "x", "z"].includes(wordEnd[1])) {
      accordKey["regular"] = "IMMUTABLE";
    } else if (["au", "eu"].includes(wordEnd)) {
      accordKey["regular"] = "AU_EU";
    } else if (wordEnd == "al") {
      accordKey["regular"] = "AL";
    } else {
      accordKey["regular"] = "PLUPART";
    }
  }

  accordKey["number"] = prevPicto.tags.some((pTag) => pTag.title == "PLURIEL")
    ? "PLURIEL"
    : "SINGULIER";
};

/**
 * An object that maps noun types to their plural endings.
 * Provides the plural endings for different types of nouns.
 */
const nomEndingMap = {
  PLUPART: "s",
  AU_EU: "x",
  AL: "ux",
};
