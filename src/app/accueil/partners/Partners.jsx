import Separator from "@/_components/_shared/Separator";
import PartnersItem from "./PartnersItem";

const partners = [
  {
    type: "Ecole d'Ingénieur",
    names: ["ECAM-EPMI"],
  },
  {
    type: "Fondation",
    names: ["Terre Plurielle de l'entreprise Bouygues Construction"],
  },
  {
    type: "Services d'Education Spéciale et de Soins A Domicile (SESSAD)",
    names: ["Boussole Bleue"],
  },
  {
    type: "Instituts Medico-éducatif (IME)",
    names: [
      "Alfred BINET (Mureaux)",
      "Le Clos du Parisis (Montigny-les-Cormeilles)",
      "La Boussole Bleue (Villiers-le-Bel)",
    ],
  },
  {
    type: "Associations",
    names: [
      "Ecoute Parents Enfants Autistes (Cormeilles en Parisis)",
      "HORS-CADRE (Cormeilles en Parisis)",
    ],
  },
];

const Partners = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-5">Partenaires</h1>
      {partners.map((partner, i) => (
        <PartnersItem key={i} type={partner.type} names={partner.names} />
      ))}
      {/* <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-2 text-center font-bold">
          Ecole d'Ingénieur
        </div>
        <div className="col-span-2">ECAM-EPMI</div>
      </div>
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-2 text-center font-bold">Fondation</div>
        <div className="col-span-2">
          Terre Plurielle de l'entreprise Bouygues Construction
        </div>
      </div>
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-2 text-center font-bold">
          Services d'Education Spéciale et de Soins A Domicile (SESSAD)
        </div>
        <div className="col-span-2">Boussole Bleue</div>
      </div>
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-2 text-center font-bold">
          Instituts Medico-éducatif (IME)
        </div>
        <div className="grid grid-cols-2 col-span-2">
          <p className="col-span-2">Alfred BINET (Mureaux)</p>
          <Separator n={2} isSimple={true} />
          <p className="col-span-2">
            Le Clos du Parisis (Montigny-les-Cormeilles)
          </p>
          <Separator n={2} isSimple={true} />
          <p className="col-span-2">La Boussole Bleue (Villiers-le-Bel)</p>
        </div>
      </div>
      <Separator n={4} isSimple={true} />
      <div className="grid grid-cols-4 *:p-4">
        <div className="col-span-2 text-center font-bold">Associations</div>
        <div className="grid grid-cols-2 col-span-2">
          <p className="col-span-2">
            Ecoute Parents Enfants Autistes (Cormeilles en Parisis)
          </p>
          <Separator n={2} isSimple={true} />
          <p className="col-span-2">HORS-CADRE (Cormeilles en Parisis)</p>
        </div>
      </div> */}
      <Separator n={4} isSimple={true} />
    </>
  );
};

export default Partners;
