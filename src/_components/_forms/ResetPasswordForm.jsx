"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { emailRegex, passwordRegex } from "@/_constants/emailRegex";
import { checkRegex } from "@/_lib/checkRegex";
import FormEmailField from "./shared/FormEmailField";
import FormPasswordField from "./shared/FormPasswordField";
import ConfirmButton from "../shared/ConfirmButton";
import LoadingSpinner from "../shared/LoadingSpinner";

const ResetPasswordForm = ({ isLoading, setIsLoading, token }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    id: token?.id,
    email: token?.sub ?? "",
    password: "",
    active: token?.active ?? false,
    verified: token?.verified ?? false,
  });
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailSent, SetIsEmailSent] = useState(false);

  const isTokenValid = (exp) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  };

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
    if (token == null && !invalidEmail) {
      console.log("send email with token");
      try {
        const responseApi = await fetch("/api/reset-password/check-email", {
          method: "POST",
          body: JSON.stringify(form),
          credentials: "include",
        });
        if (responseApi.status >= 400) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage("Email doesn't exist");
        } else {
          isError && setIsError(false);
          setIsLoading(false);
          SetIsEmailSent(true);
          return;
        }
      } catch (error) {
        console.error("Bad credentials:", error.message);
      }
    }
    if (token && isTokenValid(token.exp)) {
      console.log("reset password after receiving email with token");
      try {
        const responseApi = await fetch("/api/reset-password/reset", {
          method: "POST",
          body: JSON.stringify(form),
          credentials: "include",
        });
        if (responseApi.status >= 400) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage("Password doesn't meet requirements.");
        } else {
          isError && setIsError(false);
          setIsLoading(false);
          router.push(`/?paswordResetted=true`);
          router.refresh();
        }
      } catch (error) {
        console.error("Bad credentials:", error.message);
        setIsError(true);
        setErrorMessage("Le token est expiré");
      }
    }
  };

  return (
    <form
      className={`mx-auto min-w-[75%] *:*:mt-5 *:*:w-full *:*:z-10`}
      onSubmit={handleSubmit}
    >
      {isError && <div className="text-red-600 mx-auto">{errorMessage}</div>}
      <div className="flex flex-col justify-evenly items-center">
        {!isLoading ? (
          <>
            <p>Saisir votre email pour verifier que vous êtes un utilisateur</p>
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
          </>
        ) : (
          <LoadingSpinner text={"Checking email..."} size={"xl"} height={112} />
        )}
        {isEmailSent && (
          <p>L'email est envoyé, vérifiez votre boîte de lettre</p>
        )}
        {token &&
          (isTokenValid(token?.exp) ? (
            <>
              <p>Votre email est vérifié. Saisir votre nouveau mot de passe.</p>
              <FormPasswordField
                withLabel={false}
                id={"password"}
                title={"Mot de passe"}
                defaultValue={form.password}
                handleChange={handleChange}
                autoComplete={"current-password"}
                invalid={invalidPassword}
                required={token?.id ? true : false}
              />
            </>
          ) : (
            <p>
              Votre reset-token est expiré.{" "}
              <button
                onClick={(e) => {
                  e.preventDefault;
                  router.push(`/reset-password`);
                  router.refresh();
                }}
              >
                Réessayez encore une fois.
              </button>
            </p>
          ))}
      </div>
      <div className="mb-5">
        <ConfirmButton
          isLoading={isLoading}
          title={token?.id ? "Réinitialiser" : "Verifier"}
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
