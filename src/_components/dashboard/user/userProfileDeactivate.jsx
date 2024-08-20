import React from "react";

const UserProfileDeactivate = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <p className="text-lg text-center font-bold p-2 border-b">
        <span className="font-normal">Désactivation du profil </span>
        <a
          className="hover:text-pred trasition duration-150 ease-in-out"
          href="/dashboard"
        >
          {user?.email}
        </a>
      </p>
      <dl className="text-sm md:text-base tracking-[0.25px] leading-relaxed mb-10">
        <dt className="my-1">
          Après la désactivation de votre profil, vous ne pourrez plus :
        </dt>
        <dd>
          <span className="font-bold">gérer les données</span> du profil
        </dd>
        <dd>
          <span className="font-bold">gérer les données</span> des patients
        </dd>
        <dd>
          <span className="font-bold">prendre des notes</span> sur l&apos;état des
          patients
        </dd>
        <dd>
          <span className="font-bold">créer des sessions</span> de jeu pour les
          patients
        </dd>
        <dt className="my-1">
          Toutes les fonctionnalités seront bloquées, seule la visualisation des
          données initiales de l&apos;utilisateur désactivé sera possible.
        </dt>
      </dl>
    </div>
    // {{ form_start(passwordForm, {
    // 'attr': {
    // 'class': 'flex flex-col md:gap-3 justify-between items-center w-full h-full p-2'
    // }
    // }) }}
    //   {{ form_row(passwordForm.password, {
    //   'attr': {
    //   'class': 'input-text z-10',
    //   }
    //   }) }}

    // <button type="submit" className="btn-b mb-6">Désactiver</button>
    // {{ form_end(passwordForm) }}
  );
};

export default UserProfileDeactivate;
