export const textToSpeech = (text) => {
  let talk = new SpeechSynthesisUtterance();
  talk.text = text;
  talk.lang = "fr-FR";
  speechSynthesis.speak(talk);
};
