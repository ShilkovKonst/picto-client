import Link from "next/link";
import React from "react";

const ModeInvite = () => {
  return (
    <div
      className="flex justify-center items-center relative w-full md:w-3/5 h-auto p-4 md:p-8 lg:p-12 bg-[#e5e9ec]"
      id="a-container"
    >
      <div
        className="flex justify-between items-center gap-3 sm:gap-2 md:gap-3 flex-col w-full h-full"
        id="a-form"
      >
        <h2 className="switch__title text-2xl sm:text-3xl md:text-4xl font-bold leading-loose md:mb-5 text-center">
          Bienvenue sur <span className="text-pblue">P</span>icto
          <span className="text-pred">P</span>icto!
        </h2>
        <p className="switch__description text-sm text-center tracking-[0.25px] leading-relaxed">
          Destinée à développer la communication à l&apos;aide de pictogrammes,
          l&apos;application est réservée aux professionnels de santé qui en
          font la demande.
        </p>
        <p className="switch__description text-sm text-center tracking-[0.25px] leading-relaxed">
          L&apos;inscription vous permettra un suivi des progrès de votre
          patient ainsi que l&apos;intégration de nouveaux pictogrammes choisis
          par vos soins.
        </p>
        <p className="switch__description text-sm text-center tracking-[0.25px] leading-relaxed">
          Vous n&apos;êtes pas un professionnel de santé? Le mode invité vous
          permettra de découvrir notre application en toute liberté
        </p>
        <Link href="/session" className="btn-b flex justify-center items-center">
          Mode invité
        </Link>
      </div>
      <div className="absolute bottom-3 flex flex-col">
        <div className="font-bold inline-flex text-sm underline ">
          <a
            className="hover:text-pred transition duration-150"
            href="{{ mentions }}"
          >
            Mentions légales
          </a>
          <p className="px-2">|</p>
          <a
            className="hover:text-pred transition duration-150"
            href="{{ partners }}"
          >
            Partenaires
          </a>
          <p className="px-2">|</p>
          <a
            className="hover:text-pred transition duration-150"
            href="{{ apropos }}"
          >
            A Propos
          </a>
        </div>
        <div className="inline-flex text-sm mt-1">
          <p>
            © Tous droits réservés - <span className="text-pblue">P</span>icto
            <span className="text-pred">P</span>icto® 2021
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModeInvite;
