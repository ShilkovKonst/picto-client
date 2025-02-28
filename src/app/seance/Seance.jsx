import SeanceItem from "../../_components/seance/SeanceItem";
import FooterLink from "@/_components/accueil/FooterLink";
import HeaderImage from "@/_components/shared/HeaderImage";
import { seanceTypes } from "@/_constants/types";

const Seance = ({ session, patient }) => {
  console.log("session", session);
  console.log("patient", patient);
  if ((patient && session.active) || !patient) {
    return (
      <div className="flex flex-col w-full md:w-auto min-h-svh md:min-h-0 h-full lg:h-[95%] bg-pform md:rounded-xl overflow-hidden relative ml-auto mr-auto px-8">
        <div className="p-5">
          <HeaderImage width={240} />
        </div>
        <h1 className="text-xl text-center font-bold my-5 z-10">
          Quel type de séance voudriez-vous lancer?
        </h1>
        <div className="flex flex-col gap-5 my-5">
          {seanceTypes(patient).map((type, i) => (
            <SeanceItem
              key={i}
              title={type.title}
              link={type.link}
              icon={type.icon}
            />
          ))}
        </div>
        <div className="mx-auto my-5 z-10">
          <FooterLink
            href={patient ? "/dashboard" : "/"}
            title={patient ? "Retour au tableau de bord" : "Retour à l'accueil"}
          />
        </div>
        <div className="absolute w-96 h-96 rounded-full -bottom-1/4 md:-bottom-1/2 lg:-bottom-1/4 -left-1/4 shadow-inset-8/12"></div>
        <div className="absolute w-96 h-96 rounded-full -top-1/3 left-3/4 shadow-inset-8/12"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full md:w-auto min-h-svh md:min-h-0 h-full lg:h-[95%] bg-pform md:rounded-xl overflow-hidden relative ml-auto mr-auto px-8">
        <p>To run seances you should be active</p>
      </div>
    );
  }
};

export default Seance;
