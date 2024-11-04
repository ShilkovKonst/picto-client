import { Label, TextInput } from "flowbite-react";
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
        <div className={`mt-5`}>
          <Label htmlFor="title" value={`Title`} />
          <TextInput
            id="title"
            type={`text`}
            sizing="md"
            name="title"
            onChange={handleChange}
            value={form.title ?? ""}
            required
          />
        </div>
        <div className={`mt-5`}>
          <Label htmlFor="contactName" value={`Nom du contact`} />
          <TextInput
            id="contactName"
            type={`text`}
            sizing="md"
            name="contactName"
            onChange={handleChange}
            value={form.contactName ?? ""}
            required
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <div className={`mt-5`}>
          <Label htmlFor="email" value={`Email`} />
          <TextInput
            id="email"
            type={`email`}
            sizing="md"
            name="email"
            onChange={handleChange}
            value={form.email ?? ""}
            required
          />
        </div>
        <div className={`mt-5`}>
          <Label htmlFor="phoneNumber" value={`Numéro de téléphone`} />
          <TextInput
            id="phoneNumber"
            type={`text`}
            sizing="md"
            name="phoneNumber"
            onChange={handleChange}
            value={form.phoneNumber ?? ""}
            required
          />
        </div>
      </div>
      <div className={`mt-5`}>
        <Label htmlFor="code" value={`Code`} />
        <TextInput
          id="code"
          type={`text`}
          sizing="md"
          name="code"
          onChange={handleChange}
          value={form.code ?? ""}
          required
        />
      </div>
    </>
  );
};

export default EntityFormInstitutionFields;
