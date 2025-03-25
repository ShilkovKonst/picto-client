import { elisionRegex, hRegex } from "@/_constants/regex";
import { findTag } from "./findTag";
import { irregularId } from "@/_constants/types";
import { elisionList } from "@/_constants/elisionList";

export const checkElision = (title, nextPicto, tense, form) => {
  console.log(title, nextPicto);
  const wordEnd = title[title.length - 1].toLowerCase();
  let nextStart = nextPicto.title[0].toLowerCase();
  if (nextPicto.type == "VERBE") {
    if (form == "AFFIRMATIVE") {
      if (tense == "PASSE") {
        nextStart = findTag(nextPicto.tags, "AUXILIAIRE_AVOIR").isFounded
          ? "ai"
          : "suis";
      } else if (irregularId(nextPicto.tags)) {
        nextStart =
          nextPicto.irregular.conjugations[`${tense}_SINGULIER_PREMIER`];
      }
    } else {
      nextStart = "ne";
    }
  }
  const isNextVoyelle = elisionRegex.test(nextStart);
  const isNextHAspire =
    hRegex.test(nextStart) && findTag(nextPicto.tags, "H_ASPIRE").isFounded;
  if (
    !["a", "e"].includes(wordEnd) ||
    !isNextVoyelle ||
    isNextHAspire ||
    (wordEnd == "i" && wordEnd != nextStart)
  )
    return title + " ";

  return title.substring(0, title.length - 1) + "'";
};

export const checkVerbElision = (word, nextWord, tags) => {
  const isNextVoyelle = elisionRegex.test(nextWord);
  const isNextHMute =
    hRegex.test(nextWord) && !findTag(tags, "H_ASPIRE").isFounded;
  if (elisionList.some((e) => e == word) && (isNextVoyelle || isNextHMute)) {
    return word.substring(0, word.length - 1) + "'";
  }
  return word + " ";
};
