"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkRegex } from "@/_lib/checkRegex";
import { emailRegex, passwordRegex } from "@/_constants/regex";
import FormPasswordField from "@/_components/_forms/shared/FormPasswordField";
import FormEmailField from "@/_components/_forms/shared/FormEmailField";
import ConfirmButton from "@/_components/shared/ConfirmButton";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";

const LoginForm = ({ passwordResetted }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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
    setIsLoading(true);
    try {
      const responseApi = await fetch("/api/auth/signIn", {
        method: "POST",
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (responseApi.status >= 400) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage("Invalid credentials: incorrect email or password");
      } else {
        isError && setIsError(false);
        router.push(`/dashboard`);
        router.refresh();
      }
    } catch (error) {
      console.error("Bad credentials:", error.message);
    }
  };

  return (
    <div className="px-4">
      <h2 className=" text-center text-2xl sm:text-3xl md:text-4xl font-bold leading-loose text-[#181818] mt-5 md:mt-0">
        Connexion
      </h2>
      {!isLoading ? (
        <form
          className={`mx-auto min-w-[75%] *:*:mt-5 *:*:w-full`}
          onSubmit={handleSubmit}
        >
          {passwordResetted && <p>Votre mot de passe est reinitialisé</p>}
          {isError && (
            <div className="text-red-600 mx-auto">{errorMessage}</div>
          )}
          <div className="flex flex-col justify-evenly items-center">
            <FormEmailField
              withLabel={false}
              inputType={"email"}
              id={"email"}
              title={"Email"}
              defaultValue={form.email}
              handleChange={handleChange}
              autoComplete={"username"}
              invalid={invalidEmail}
            />
            <FormPasswordField
              withLabel={false}
              id={"password"}
              title={"Mot de passe"}
              defaultValue={form.password}
              handleChange={handleChange}
              autoComplete={"current-password"}
              invalid={invalidPassword}
            />
            <Link
              href="/accueil/reset-password"
              className="pl-1 cursor-pointer underline text-sm leading-loose font-bold hover:text-secondary transition duration-150"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="mb-5">
            <ConfirmButton />
          </div>
        </form>
      ) : (
      <div className="flex justify-center items-center h-[244px]">
        <LoadingSpinner text={"Signing in..."} size={"xl"}/>
      </div>
        
      )}
    </div>
  );
};

export default LoginForm;
