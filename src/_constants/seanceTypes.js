import { FaComments, FaGamepad, FaQuestion } from "react-icons/fa6";

export const types = (patient) => [
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
