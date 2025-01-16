"use client";
import SeanceItem from "./SeanceItem";
import { usePathname, useSearchParams } from "next/navigation";
import { FaComments, FaGamepad, FaHouse, FaQuestion } from "react-icons/fa6";
import Separator from "../shared/Separator";
import { types } from "@/_constants/seanceTypes";

const LayoutNavModal = ({ session }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const patient = searchParams.get("patient");

  return (
    <div
      className={`w-0 opacity-100 group-hover:opacity-100 group-hover:w-72 right-[calc(100%-0.1rem)] group-hover:right-full block absolute  top-0 bg-pform rounded-l-lg overflow-hidden transition-all ease-in-out duration-300`}
    >
      <Separator />
      <div className="flex flex-col gap-5 my-5 px-3 w-72">
        {types(session ? patient : null).map(
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
        {session ? (
          <SeanceItem
            title={"Tableau de bord"}
            link={"/dashboard"}
            icon={<FaHouse size={"2rem"} />}
          />
        ) : (
          <SeanceItem
            title={"Page d'accueil"}
            link={"/"}
            icon={<FaHouse size={"2rem"} />}
          />
        )}
      </div>
      <Separator />
    </div>
  );
};

export default LayoutNavModal;
