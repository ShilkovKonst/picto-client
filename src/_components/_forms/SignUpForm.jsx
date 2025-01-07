"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import images from "@/_constants/images";
import { emailRegex, passwordRegex } from "@/_constants/emailRegex";
import { checkRegex } from "@/_lib/checkRegex";
import FormTextField from "@/_components/_forms/shared/FormTextField";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import FormPasswordField from "@/_components/_forms/shared/FormPasswordField";
import FormEmailField from "@/_components/_forms/shared/FormEmailField";
import ConfirmButton from "@/_components/_shared/atoms/ConfirmButton";

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
  const [isError, setIsError] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    checkRegex(
      e,
      "password",
      passwordRegex,
      invalidPassword,
      setInvalidPassword
    );
    checkRegex(e, "email", emailRegex, invalidEmail, setInvalidEmail);

    isError && setIsError(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRegex.test(form.password)) {
      console.log("password good", form.password);
    } else {
      setIsError(true);
      setErrorCode(111);
      setErrorMessage(
        "Password doesn't match security pattern:\nlength - at least 8 characters; \ncontent - at least one: digit, capital letter, special symbol from &$*#!?@)"
      );
      return;
    }
    try {
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
      className="flex justify-center z-10 relative items-center h-full w-full bg-[#e5e9ec]"
      id="connexion switch-cnt"
    >
      <div
        className="flex justify-between items-center flex-col w-full h-full p-4 md:p-8"
        id="switch-c1"
      >
        <Image
          src={images.logo}
          alt="LogoEcam.png"
          width={140}
          className="z-10 "
          priority={true}
        />
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

        <form
          className={`mx-auto min-w-[75%] *:*:mt-3 *:*:w-full *:*:z-10 *:md:flex-row *:md:gap-3`}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-0 ">
            <FormEmailField
              id={"email"}
              title={"Email"}
              defaultValue={form.email}
              handleChange={handleChange}
              autoComplete={"username"}
              invalid={invalidEmail}
            />
            <FormPasswordField
              id={"password"}
              title={"Mot de passe"}
              inputType={"password"}
              defaultValue={form.password}
              handleChange={handleChange}
              autoComplete={"new-password"}
              invalid={invalidPassword}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
            <FormTextField
              id={"firstName"}
              title={"Prénom"}
              defaultValue={form.firstName}
              handleChange={handleChange}
            />
            <FormTextField
              id={"lastName"}
              title={"Nom"}
              defaultValue={form.lastName}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
            <FormTextField
              id={"phoneNumber"}
              title={"Numéro de téléphone"}
              defaultValue={form.phoneNumber}
              handleChange={handleChange}
            />
            <FormTextField
              id={"job"}
              title={"Fonction"}
              defaultValue={form.job}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
            <FormSelectListField
              id={"institutionId"}
              title={"Institution"}
              zeroListElement={"Choisir votre institution"}
              defaultValue={-1}
              handleChange={handleChange}
              list={institutions}
            />
            <FormTextField
              id={"code"}
              title={"Code de vérification"}
              defaultValue={form.code}
              handleChange={handleChange}
            />
          </div>
          <div className="pt-5 mb-5">
            <ConfirmButton />
          </div>
        </form>
        <p className="z-10 text-sm mx-auto leading-loose font-bold">
          Déjà s&apos;inscrit ?
          <Link
            href="/"
            className="cursor-pointer underline hover:text-pred transition duration-150 ml-2"
          >
            Se connecter
          </Link>
        </p>
      </div>
      <div className="-z-10 switch__circle absolute w-96 h-96 rounded-full -bottom-1/4 md:-bottom-1/2 lg:-bottom-1/4 -left-1/4 shadow-inset-8/12"></div>
      <div className="switch__circle switch__circle--t absolute w-96 h-96 rounded-full -top-1/3 left-3/4 shadow-inset-8/12"></div>
    </div>
  );
};

export default SignUpForm;
