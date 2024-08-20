"use client";
import images from "@/_constants/images";
import { signup } from "@/_helpers/authApiHelpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    isError && setIsError(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    try {
      const response = await signup(formData);
      if (response.status >= 400) {
        setIsError(true);
        setErrorMessage("Invalid credentials:"+ 
          "user already exists");
      } else {
        router.push(`/`);
        router.refresh();
      }
    } catch (error) {
      throw new Error(
        "Une erreur s'est produite lors de"+ 
        "l'envoi du message. " 
        + error.message
      );
    }
  };

  return (
    <div
      className="flex justify-center z-10 relative items-center h-full w-full bg-[#e5e9ec] overflow-hidden shadow-outset-4/10"
      id="connexion switch-cnt"
    >
      <div
        className="flex justify-between items-center flex-col w-full h-full p-4 md:p-8 lg:p-12"
        id="switch-c1"
      >
        <Image
          src={images.logo}
          alt="LogoEcam.png"
          width={140}
          className="z-10 "
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-[#181818] md:mb-4">
          Inscription
        </h2>

        <form className="flex flex-col w-full h-full">
          {isError && (
            <div className="text-red-600 mx-auto">{errorMessage}</div>
          )}
          <div className="z-50">
            <input
              type="email"
              name="email"
              id="email"
              className="input-text md:mb-4"
              autoComplete="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              required
              autoFocus
            />
            <input
              type="password"
              name="password"
              id="password"
              className="input-text md:mb-4"
              onChange={handleChange}
              value={form.password}
              required
              placeholder="Mot de passe"
            />
            {/* <input
              type="hidden"
              name="_csrf_token"
              value="{{ csrf_token('authenticate') }}"
            /> */}
          </div>

          <div className="flex flex-col items-center justify-between w-full h-full">
            <button
              className="z-10 btn-b flex justify-center items-center"
              type="submit"
              onClick={handleSubmit}
            >
              S&apos;inscrire
            </button>
          </div>
        </form>
        <p className="z-10 absolute bottom-0 md:bottom-3 text-sm mx-auto h-11 leading-loose font-bold">
          Déjà s&apos;inscrit ?
          <a
            href="/"
            className="cursor-pointer underline hover:text-pred transition duration-150 ml-2"
          >
            Se connecter
          </a>
        </p>
      </div>
      <div className="switch__circle absolute w-96 h-96 rounded-full -bottom-1/2 -left-1/2 shadow-inset-8/12"></div>
      <div className="switch__circle switch__circle--t absolute w-96 h-96 rounded-full -top-1/3 left-3/4 shadow-inset-8/12"></div>
    </div>
  );
};

export default SignUpForm;
