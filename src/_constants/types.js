import { FaComments, FaGamepad, FaQuestion } from "react-icons/fa6";

export const seanceTypes = (patient) => [
  {
    title: "Echange",
    link: `/seance/exchange${patient ? "?patient=" + patient : ""}`,
    icon: <FaComments size={"2rem"} />,
  },
  {
    title: "Dialogue",
    link: `/seance/dialogue${patient ? "?patient=" + patient : ""}`,
    icon: <FaQuestion size={"2rem"} />,
  },
  {
    title: "Jeux de mémoire",
    link: `/seance/games${patient ? "?patient=" + patient : ""}`,
    icon: <FaGamepad size={"2rem"} />,
  },
];

export const tensesTypes = ["PRESENT", "PASSE", "FUTUR"];

export const roleTypes = ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPERADMIN"];

export const conjugationTenses = ["PRESENT", "FUTUR"];
export const conjugationNumbers = ["SINGULIER", "PLURIEL"];
export const conjugationPersons = ["PREMIER", "DEUXIEME", "TROISIEME"];

export const pictoTypes = [
  "PRONOM",
  "DETERMINANT",
  "NOM",
  "ADJECTIF",
  "PREPOSITION",
  "VERBE",
  "NOMBRE",
  "INVARIABLE",
  "INTERROGATIF",
];

export const pictoTypesMap = {
  PRONOM: "pronom",
  DETERMINANT: "déterminant",
  NOM: "nom",
  ADJECTIF: "adjectif",
  PREPOSITION: "préposition",
  VERBE: "verbe",
  NOMBRE: "nombre",
  INVARIABLE: "invariable",
  INTERROGATIF: "interrogatif",
};

export const catListTypes = [
  { title: "super-catégories", value: "supercategories" },
  { title: "sous-catégories", value: "subcategories" },
];

export const pictoListTypes = [
  { title: "pronom", value: "PRONOM" },
  { title: "déterminant", value: "DETERMINANT" },
  { title: "nom", value: "NOM" },
  { title: "adjectif", value: "ADJECTIF" },
  { title: "préposition", value: "PREPOSITION" },
  { title: "verbe", value: "VERBE" },
  { title: "nombre", value: "NOMBRE" },
  { title: "invariable", value: "INVARIABLE" },
  { title: "interrogatif", value: "INTERROGATIF" },
  { title: "sans catégorie", value: "orphan" },
];

export const irregularId = (tags) =>
  tags?.find((t) => t.title == "IRREGULIER")?.id;

export const tagsMap = {
  AUXILIAIRE_AVOIR: "auxiliare avoir",
  AUXILIAIRE_ETRE: "auxiliare être",
  IRREGULIER: "irrégulier",
  MASCULIN: "masculin",
  FEMININ: "féminin",
  INDIFFERENT: "indifférent",
  SINGULIER: "singulier",
  PLURIEL: "pluriel",
  PREMIER: "premier",
  DEUXIEME: "deuxième",
  TROISIEME: "troisième",
  AVANT: "avant",
  APRES: "après",
};

export const generateConjugationKey = (tense, number, person) =>
  `${tense}_${number}_${person}`;
