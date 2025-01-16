"use client";
import SeanceItem from "./SeanceItem";
import { usePathname, useSearchParams } from "next/navigation";
import { FaComments, FaGamepad, FaHouse, FaQuestion } from "react-icons/fa6";

const LayoutNavModal = ({isOpen}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const patient = searchParams.get("patient");
  
  const types = [
    {
      title: "Echange",
      link: `/seance/exchange?patient=${patient}`,
      icon: <FaComments size={"2rem"} />,
    },
    {
      title: "Dialogue",
      link: `/seance/dialogue?patient=${patient}`,
      icon: <FaQuestion size={"2rem"} />,
    },
    {
      title: "Jeux",
      link: `/seance/games?patient=${patient}`,
      icon: <FaGamepad size={"2rem"} />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 my-5 px-3 w-72">
      {types.map(
        (type, i) =>
          !pathname.includes(type.title.toLowerCase()) && (
            <SeanceItem
              key={i}
              title={type.title}
              link={type.link}
              icon={type.icon}
            />
          )
      )}
      <SeanceItem
        title={"Tableau de bord"}
        link={"/dashboard"}
        icon={<FaHouse size={"2rem"} />}
      />
    </div>
  );
};

export default LayoutNavModal;
