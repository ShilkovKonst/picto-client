"use client";
import SignUpForm from "@/_components/_forms/signUpForm";
import { useState } from "react";

const SignUp = ({ institutions }) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex justify-between items-center flex-col w-full h-full p-4 md:p-8 z-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-[#181818] md:mb-4">
        Inscription
      </h2>
      {isError && (
        <div className="text-red-600 mx-auto w-[75%]">
          <span className="font-semibold pr-1">Invalid credentials:</span>
          {errorMessage.split("\n").map((e, i) => (
            <p>{e}</p>
          ))}
        </div>
      )}
      <SignUpForm
        institutions={institutions}
        isError={isError}
        setIsError={setIsError}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default SignUp;
