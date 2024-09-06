import LoginForm from "@/_components/accueil/_loginForm";
import ModeInvite from "@/_components/accueil/_modeInvite";
import React from "react";

const Accueil = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-full md:h-[95%] bg-pform sm:rounded-xl overflow-hidden relative ml-auto mr-auto">
      <LoginForm />
      <ModeInvite />
    </div>
  );
};

export default Accueil;
