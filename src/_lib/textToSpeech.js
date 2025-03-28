export const textToSpeech = (text) => {
  let talk = new SpeechSynthesisUtterance();
  talk.text = text;
  talk.lang = "fr-FR";
  speechSynthesis.speak(talk);
};

export const textToSpeechStep = (phraseSplit, stepPlayId, setStepPlayId) => {
  // let phraseSplit = phrase.split(" ").filter((e) => e != "");
  textToSpeech(phraseSplit[stepPlayId == -1 ? 0 : stepPlayId]);
  setStepPlayId((prev) => ++prev);
  if (stepPlayId >= phraseSplit.length - 1) {
    setStepPlayId(0);
  }
};
