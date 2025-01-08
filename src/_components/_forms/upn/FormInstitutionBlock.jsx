import { useEffect } from "react";
import LoadingSpinner from "@/_components/_shared/LoadingSpinner";
import FormTextField from "@/_components/_forms/shared/FormTextField";

const FormInstitutionBlock = ({
  institution,
  form,
  setForm,
  handleChange,
}) => {
  useEffect(() => {
    setForm({
      ...form,
      title: institution?.title ?? "",
      contactName: institution?.contactName ?? "",
      email: institution?.email ?? "",
      phoneNumber: institution?.phoneNumber ?? "",
      code: institution?.code ?? "",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        {form.title != undefined ? (
          <FormTextField
            id={"title"}
            title={"Title:"}
            defaultValue={form.title}
            handleChange={handleChange}
          />
        ) : (
          <LoadingSpinner text={"Loading title..."} />
        )}
        {form.contactName != undefined ? (
          <FormTextField
            id={"contactName"}
            title={"Nom du contact:"}
            defaultValue={form.contactName}
            handleChange={handleChange}
          />
        ) : (
          <LoadingSpinner text={"Loading contact name..."} />
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        {form.email != undefined ? (
          <FormTextField
            id={"email"}
            title={"Email:"}
            defaultValue={form.email}
            handleChange={handleChange}
          />
        ) : (
          <LoadingSpinner text={"Loading email..."} />
        )}
        {form.phoneNumber != undefined ? (
          <FormTextField
            id={"phoneNumber"}
            title={"Numéro de téléphone:"}
            defaultValue={form.phoneNumber}
            handleChange={handleChange}
          />
        ) : (
          <LoadingSpinner text={"Loading phone number..."} />
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        {form.code != undefined ? (
          <FormTextField
            id={"code"}
            title={"Code:"}
            defaultValue={form.code}
            handleChange={handleChange}
          />
        ) : (
          <LoadingSpinner text={"Loading code..."} />
        )}
      </div>
    </>
  );
};

export default FormInstitutionBlock;
