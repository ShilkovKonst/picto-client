import AccueilFooterApropos from "../../accueil/FooterApropos";
import AccueilFooterForm from "../../accueil/Footer";

const AccueilFooterDesktop = () => {
  return (
    <div className="grid grid-cols-5 *:p-4">
      <div className="col-span-2 flex justify-center items-start">
        <AccueilFooterForm />
      </div>
      <div className="col-span-3 flex flex-col">
        <AccueilFooterApropos />
      </div>
    </div>
  );
};

export default AccueilFooterDesktop;
