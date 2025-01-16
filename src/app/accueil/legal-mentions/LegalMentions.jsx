import Separator from "@/_components/shared/Separator";
import LegalMentionsItem from "./LegalMentionsItem";

const legalMentions = [
  {
    title: "ARTICLE 1 :",
    subtitle: "L’éditeur",
    text: (
      <>
        <p>
          L’édition et la direction de la publication du site{" "}
          <b>{process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b> est assurée par M
          Benkherrat Moncef dont l'adresse e-mail est{" "}
          <b>
            <i>pictopictoecam@gmail.com</i>
          </b>
          .
        </p>
      </>
    ),
  },
  {
    title: "ARTICLE 2 :",
    subtitle: "L’hébergeur",
    text: (
      <>
        <p>
          L'hébergeur du site{" "}
          <b>{process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b> est la{" "}
          <b>Société OVH</b>, dont le siège social est situé au 2 rue Kellermann
          59100 ROUBAIX , avec le numéro de téléphone : 0955006633.
        </p>
      </>
    ),
  },
  {
    title: "ARTICLE 3 :",
    subtitle: "Accès au site",
    text: (
      <>
        <p>
          Le site est accessible 7j/7, 24h/24 sauf cas de force majeure,
          interruption programmée ou non et pouvant découler d’une nécessité de
          maintenance. En cas de modification, interruption ou suspension des
          services le site {process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL} ne
          saurait être tenu responsable.
        </p>
      </>
    ),
  },
  {
    title: "ARTICLE 4 :",
    subtitle: "Collecte des données",
    text: (
      <>
        <p>
          Le site assure à l'Utilisateur une collecte et un traitement
          d'informations personnelles dans le respect de la vie privée
          conformément à la loi n°78-17 du 6 janvier 1978 relative à
          l'informatique, aux fichiers et aux libertés. En vertu de la loi
          Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur
          dispose d'un droit d'accès, de rectification, de suppression et
          d'opposition de ses données personnelles. L'Utilisateur exerce ce
          droit par mail à l'adresse email{" "}
          <b>
            <i>pictopictoecam@gmail.com</i>
          </b>
          .
        </p>
      </>
    ),
  },
  {
    title: "ARTICLE 5 :",
    subtitle: "Propriété intellectuelle",
    text: (
      <>
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation,
          modification de toute ou partie du site{" "}
          <b>{process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b>, sans
          autorisation de l’Editeur est prohibée et pourra entraînée des actions
          et poursuites judiciaires prévues par le Code de la propriété
          intellectuelle et le Code civil.
        </p>
      </>
    ),
  },
];

const LegalMentions = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-5">Mentions légales</h1>
      <p className="italic text-center mb-3">En vigueur au 14/04/2021</p>
      <p className="text-start indent-4 mb-2">
        Conformément aux dispositions des Articles 6-III et 19 de la Loi
        n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique,
        dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site
        <b>{" " + process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b> les présentes
        mentions légales. La connexion et la navigation sur le site (indiquer le
        nom du site) par l’Utilisateur implique acceptation intégrale et sans
        réserve des présentes mentions légales. Ces dernières sont accessibles
        sur le site à la rubrique <b>«Mentions légales»</b>.
      </p>
      {legalMentions.map((mention, i) => (
        <LegalMentionsItem
          key={i}
          title={mention.title}
          subtitle={mention.subtitle}
          text={mention.text}
        />
      ))}
      <Separator n={4} isSimple={true} />
      {/* {legalMentions.map((mention, i) => (
        <LegalMentionsItem
          key={i}
          title={mention.title}
          subtitle={mention.subtitle}
          text={mention.text}
        />
      ))} */}
    </>
    // {/* <h2 className="text-3xl text-center font-bold">ARTICLE 1 : L’éditeur</h2>
    // <p className="text-start indent-4 px-3">
    //   L’édition et la direction de la publication du site
    //   <b>{" " + process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b> est assurée
    //   par M Benkherrat Moncef dont l'adresse e-mail est{" "}
    //   <b className="italic">pictopictoecam@gmail.com</b>.
    // </p>
    // <h2 className="text-3xl text-center font-bold">
    //   ARTICLE 2 : L’hébergeur
    // </h2>
    // <p className="text-start indent-4 px-3">
    //   L'hébergeur du site{" "}
    //   <b>{" " + process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b> est la
    //   Société OVH, dont le siège social est situé au 2 rue Kellermann 59100
    //   ROUBAIX , avec le numéro de téléphone : 0955006633.
    // </p>
    // <h2 className="text-3xl text-center font-bold">
    //   ARTICLE 3 : Accès au site
    // </h2>
    // <p className="text-start indent-4 px-3">
    //   Le site est accessible 7j/7, 24h/24 sauf cas de force majeure,
    //   interruption programmée ou non et pouvant découler d’une nécessité de
    //   maintenance. En cas de modification, interruption ou suspension des
    //   services le site
    //   <b>{" " + process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b> ne saurait
    //   être tenu responsable.
    // </p>
    // <h2 className="text-3xl text-center font-bold">
    //   ARTICLE 4 : Collecte des données
    // </h2>
    // <p className="text-start indent-4 px-3">
    //   Le site assure à l'Utilisateur une collecte et un traitement
    //   d'informations personnelles dans le respect de la vie privée
    //   conformément à la loi n°78-17 du 6 janvier 1978 relative à
    //   l'informatique, aux fichiers et aux libertés. En vertu de la loi
    //   Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur
    //   dispose d'un droit d'accès, de rectification, de suppression et
    //   d'opposition de ses données personnelles. L'Utilisateur exerce ce droit
    //   par mail à l'adresse email{" "}
    //   <b className="italic">pictopictoecam@gmail.com</b>.
    // </p>
    // <h2 className="text-3xl text-center font-bold">
    //   ARTICLE 5 : Propriété intellectuelle
    // </h2>
    // <p className="text-start indent-4 px-3">
    //   Toute utilisation, reproduction, diffusion, commercialisation,
    //   modification de toute ou partie du site{" "}
    //   <b>{" " + process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}</b>, sans
    //   autorisation de l’Editeur est prohibée et pourra entraînée des actions
    //   et poursuites judiciaires prévues par le Code de la propriété
    //   intellectuelle et le Code civil.
    // </p> */}
  );
};

export default LegalMentions;
