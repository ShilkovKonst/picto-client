import { Checkbox, Label, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect } from "react";

const EntityFormPersonFields = ({
  person,
  entityName,
  institutions,
  users,
  roles,
  form,
  setForm,
  handleChange,
}) => {
  useEffect(() => {
    entityName == "users" &&
      setForm({
        ...form,
        lastName: person?.lastName ?? "",
        firstName: person?.firstName ?? "",
        email: person?.email ?? "",
        password: person?.password ?? "",
        phoneNumber: person?.phoneNumber ?? "",
        job: person?.job ?? "",
        active: person?.active ?? false,
        verified: person?.verified ?? false,
        roles: person?.roles ?? [],
        institutionId: person?.institutionId ?? "",
      });
  }, []);
  useEffect(() => {
    console.log(form);
  }, [form]);

  const addRole = (roleId) => {
    setForm({
      ...form,
      roles: [...form.roles, roleId],
    });
  };
  const removeRole = (roleId) => {
    setForm({
      ...form,
      roles: form.roles.filter((r) => r != roleId),
    });
  };
  const handleRoleChange = (e, role) => {
    if (e.target.checked) {
      addRole(role.id);
    } else {
      removeRole(role.id);
    }
  };
  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <div className={`mt-5`}>
          <Label htmlFor="lastName" value={`Nom`} />
          <TextInput
            id="lastName"
            type={`text`}
            sizing="md"
            name="lastName"
            onChange={handleChange}
            value={form.lastName ?? ""}
            required
          />
        </div>
        <div className={`mt-5`}>
          <Label htmlFor="firstName" value={`Prénom`} />
          <TextInput
            id="firstName"
            type={`text`}
            sizing="md"
            name="firstName"
            onChange={handleChange}
            value={form.firstName ?? ""}
            required
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <div className={`mt-5`}>
          <Label htmlFor="email" value={`email`} />
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
          <Label htmlFor="password" value={`Mot de passe`} />
          <TextInput
            id="password"
            type={`password`}
            sizing="md"
            name="password"
            onChange={handleChange}
            value={form.password ?? ""}
            required
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
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
        <div className={`mt-5`}>
          <Label htmlFor="job" value={`Fonction`} />
          <TextInput
            id="job"
            type={`text`}
            sizing="md"
            name="job"
            onChange={handleChange}
            value={form.job ?? ""}
            required
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <div className={`mt-5`}>
          <Checkbox
            id={"active"}
            name="active"
            checked={form.active ?? false}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <Label htmlFor="active" value={`Activé`} />
        </div>
        <div className={`mt-5`}>
          <Checkbox
            id={"verified"}
            name="verified"
            checked={form.verified ?? false}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <Label htmlFor="verified" value={`Vérifié`} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <div className={`mt-5`}>
          <Label htmlFor="institutionId" value={`Institution`} />
          <Select
            id="institutionId"
            name="institutionId"
            className="input-text md:mb-4 pl-0"
            onChange={handleChange}
            defaultValue={-1}
            required
          >
            <option value={-1}>Choisir une institution</option>
            {institutions
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((inst, i) => (
                <option key={i} value={inst.id}>
                  {inst.title}
                </option>
              ))}
          </Select>
        </div>
        <div className={`mt-5`}>
          <Label htmlFor="roles" value={`Rôles`} />
          {form?.roles ? (
            roles?.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox
                  id={r.id}
                  value={r?.id}
                  checked={form?.roles?.includes(r.id) ? true : false}
                  onChange={(e) => handleRoleChange(e, r)}
                />
                <Label htmlFor={r.id}>{r.title}</Label>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <Spinner className="" aria-label="Loading roles..." />
              <p className="pl-2">Loading roles...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EntityFormPersonFields;
