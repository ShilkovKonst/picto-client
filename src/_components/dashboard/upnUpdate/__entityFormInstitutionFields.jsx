import TextItem from "@/_components/shared/TextItem";
import { useEffect } from "react";

const EntityFormInstitutionFields = ({
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
        <TextItem
          id={"title"}
          title={"Title:"}
          defaultValue={form.title}
          handleChange={handleChange}
        />
        <TextItem
          id={"contactName"}
          title={"Nom du contact:"}
          defaultValue={form.contactName}
          handleChange={handleChange}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <TextItem
          id={"email"}
          title={"Email:"}
          defaultValue={form.email}
          handleChange={handleChange}
        />
        <TextItem
          id={"phoneNumber"}
          title={"Numéro de téléphone:"}
          defaultValue={form.phoneNumber}
          handleChange={handleChange}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <TextItem
          id={"code"}
          title={"Code:"}
          defaultValue={form.code}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default EntityFormInstitutionFields;
