import LoginForm from "@/_components/accueil/_loginForm";
import ModeInvite from "@/_components/accueil/_modeInvite";
import React from "react";

const Accueil = () => {
  return (
    <div className="flex flex-col md:flex-row w-full lg:w-3/4 xl:w-2/3 min-h-svh md:min-h-0 h-full lg:h-[95%] bg-pform lg:rounded-xl overflow-hidden relative ml-auto mr-auto">
      <LoginForm />
      <ModeInvite />
    </div>
  );
};

export default Accueil;
