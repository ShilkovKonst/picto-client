export const types = [
  "verbe",
  "nom",
  "adjectif",
  "invariable",
  "interrogatif",
  "pronom_ou_determinant",
];

export const irregularId = (tags) =>
  tags?.find((t) => t.title == "irregulier").id;
