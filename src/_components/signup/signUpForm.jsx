"use client";
import images from "@/_constants/images";
import { Select } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = ({ institutions }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    job: "",
    institutionId: "",
    code: "",
    active: true,
    verified: false,
  });
  const [isPasswordRevealed, SetIsPasswordRevealed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const handleChange = (e) => {
    isError && setIsError(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await signup(form);
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        body: JSON.stringify(form),
        credentials: "include",
      });
      const body = await response.json();
      if (body.status >= 400) {
        setIsError(true);
        setErrorCode(body.status);
        setErrorMessage(body.title);
      } else {
        try {
          const loginData = {
            email: form.email,
            password: form.password,
          };
          const loginResponse = await fetch("/api/auth/signIn", {
            method: "POST",
            body: JSON.stringify(loginData),
            credentials: "include",
          });
          const data = await loginResponse.json();
          if (data.user) {
            localStorage.setItem("userData", JSON.stringify(data.user));
          }
          router.push(`/dashboard`);
          router.refresh();
        } catch (error) {
          throw new Error(
            "Une erreur s'est produite lors de l'envoi du message. " +
              error.message
          );
        }
      }
    } catch (error) {
      throw new Error(
        "Une erreur s'est produite lors de l'envoi du message. " + error.message
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

        <form className="flex flex-col w-full h-full" onSubmit={handleSubmit}>
          {isError && (
            <div className="text-red-600 mx-auto">
              <span className="font-semibold pr-1">Invalid credentials:</span>
              {errorMessage}
            </div>
          )}
          <div className="z-50 flex justify-center items-center md:flex-wrap flex-col md:flex-row gap-3 *:w-2/3 md:*:w-1/3">
            <div>
              <label
                className={`${isError && errorCode == 400 && "text-red-600"}`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`input-text md:mb-4 ${isError && errorCode == 400 && "bg-red-100"}`}
                autoComplete="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                required
                autoFocus
              />
            </div>
            <div className="relative">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-text md:mb-4"
                onChange={handleChange}
                value={form.password}
                required
                autoComplete="current-password"
                placeholder="Mot de passe"
              />
            </div>
            <div>
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="input-text md:mb-4"
                placeholder="Prénom"
                onChange={handleChange}
                value={form.firstName}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="input-text md:mb-4"
                placeholder="Nom"
                onChange={handleChange}
                value={form.lastName}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Numéro de téléphone</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="input-text md:mb-4"
                placeholder="Numéro de téléphone"
                onChange={handleChange}
                value={form.phoneNumber}
                required
              />
            </div>
            <div>
              <label htmlFor="job">Fonction</label>
              <input
                type="text"
                name="job"
                id="job"
                className="input-text md:mb-4"
                placeholder="Fonction"
                onChange={handleChange}
                value={form.job}
                required
              />
            </div>
            <div>
              <label htmlFor="institution">Institution</label>
              <Select
                id="institutionId"
                name="institutionId"
                className="input-text md:mb-4 pl-0"
                onChange={handleChange}
                defaultValue={-1}
                required
              >
                <option value={-1}>Choisir votre institution</option>
                {institutions
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((inst, i) => (
                    <option key={i} value={inst.id}>
                      {inst.title}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label
                className={`${isError && errorCode == 403 && "text-red-600"}`}
                htmlFor="institution"
              >
                Code de vérification
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className={`input-text md:mb-4 ${isError && errorCode == 403 && "bg-red-100"}`}
                placeholder="Saisir code de votre institution"
                onChange={handleChange}
                value={form.code}
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between w-full h-full">
            <button
              className="z-10 btn-b flex justify-center items-center"
              type="submit"
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
