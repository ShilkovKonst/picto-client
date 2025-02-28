export const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word, i) =>
      i == 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ");
};
