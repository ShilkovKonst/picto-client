import LinkButtonForm from "./LinkButtonForm";


const GuestMode = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-5 md:gap-0 px-4 h-full">
      <p className="switch__description text-sm text-center tracking-[0.25px] leading-relaxed">
        Destinée à développer la communication à l&apos;aide de pictogrammes,
        l&apos;application est réservée aux professionnels de santé qui en font
        la demande.
      </p>
      <p className="switch__description text-sm text-center tracking-[0.25px] leading-relaxed">
        L&apos;inscription vous permettra un suivi des progrès de votre patient
        ainsi que l&apos;intégration de nouveaux pictogrammes choisis par vos
        soins.
      </p>
      <p className="switch__description text-sm text-center tracking-[0.25px] leading-relaxed">
        Vous n&apos;êtes pas un professionnel de santé? Le mode invité vous
        permettra de découvrir notre application en toute liberté
      </p>
      <LinkButtonForm href={"/seance"} title={"Mode invité"} />
    </div>
  );
};

export default GuestMode;
