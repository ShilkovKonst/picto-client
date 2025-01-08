"use client";
import ResetPasswordForm from "@/_components/_forms/ResetPasswordForm";
import { useState } from "react";

const PasswordReset = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="z-10 flex flex-col w-auto md:rounded-xl overflow-hidden relative ml-auto mr-auto p-5">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-[#181818] md:mb-4">
        Réinitialiation de mot de passe
      </h2>
      <ResetPasswordForm
        token={token}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default PasswordReset;
