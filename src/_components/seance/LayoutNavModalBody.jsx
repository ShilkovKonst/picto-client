"use client";
import SeanceItem from "./SeanceItem";
import { usePathname, useSearchParams } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import Separator from "../shared/Separator";
import { seanceTypes } from "@/_constants/types";
import { useEffect } from "react";

const LayoutNavModalBody = ({ session, isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const patient = searchParams.get("patient");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      className={`w-0 right-[calc(100%-0.1rem)] z-50 ${
        isOpen && "w-72 right-full"
      } block absolute top-0 bg-pform rounded-l-lg overflow-hidden transition-all ease-in-out duration-300 border-gray-300 border-l-2`}
    >
      <Separator />
      <div className="flex flex-col gap-5 my-5 px-3 w-72">
        {seanceTypes(session ? patient : null).map(
          (type, i) =>
            !pathname.includes(type.path) && (
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

export default LayoutNavModalBody;
