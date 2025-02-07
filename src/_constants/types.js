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

export const pictoTypes = [
  "verbe",
  "nom",
  "nombre",
  "adjectif",
  "invariable",
  "interrogatif",
  "pronom",
  "determinant",
];

export const catListTypes = [
  { title: "super-catégories", value: "supercategories" },
  { title: "sous-catégories", value: "subcategories" },
];

export const pictoListTypes = [
  { title: "verbe", value: "verbe" },
  { title: "nom", value: "nom" },
  { title: "nombre", value: "nombre" },
  { title: "adjectif", value: "adjectif" },
  { title: "invariable", value: "invariable" },
  { title: "interrogatif", value: "interrogatif" },
  { title: "pronom", value: "pronom" },
  { title: "determinant", value: "determinant" },
  { title: "pronom / determinant", value: "pronom_ou_determinant" },
  { title: "sans catégorie", value: "orphan" },
];

export const irregularId = (tags) =>
  tags?.find((t) => t.title == "irregulier").id;
