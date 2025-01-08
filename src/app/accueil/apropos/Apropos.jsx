import Separator from "@/_components/_shared/Separator";
import AproposItem from "./AproposItem";

const apropos = [
  {
    title: "Auteur et Chef de Projet",
    name: "Moncef BENKHERRAT (ECAM-EPMI)",
  },
  {
    title: "Responsable Développement Informatique",
    name: "Mustapha YOUNSI",
  },
  {
    title: "Développement Informatique",
    name: "Konstantin SHILKOV",
  },
  {
    title: "Parrain du Projet",
    name: "Pascal LEGENDRE (Bouygues Energies et Services)",
  },
  {
    title: "Educateur Spécialisé",
    name: "Didier BEAUFOL (Association HORS-CADRE)",
  },
];

const Apropos = () => {
  return (
    <div className="z-10">
      <h1 className="text-4xl text-center font-bold mb-5">
        Equipe de Développement
      </h1>
      {apropos.map((item, i) => (
        <AproposItem key={i} title={item.title} name={item.name} />
      ))}
      <Separator n={4} isSimple={true} />
    </div>
  );
};

export default Apropos;
