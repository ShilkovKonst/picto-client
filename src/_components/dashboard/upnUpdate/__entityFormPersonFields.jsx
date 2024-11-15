import {
  Checkbox,
  Datepicker,
  Label,
  Radio,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
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
  console.log(person);
  console.log(form);
  // console.log(form.roles);
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
        active: person?.active ?? undefined,
        verified: person?.verified ?? undefined,
        roles: person?.roles?.map((r) => r.id) ?? [],
        institutionId: person?.institution.id ?? -1,
      });
    entityName == "patients" &&
      setForm({
        ...form,
        lastName: person?.lastName ?? "",
        firstName: person?.firstName ?? "",
        code: person?.code ?? "",
        grade: person?.grade ?? "",
        sex: person?.sex ?? "",
        active: person?.active ?? undefined,
        birthDate: new Date(person?.birthDate).toLocaleDateString(),
        user: person?.user?.id ?? -1,
      });
  }, []);

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

  const handleRadioChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, birthDate: date.toLocaleDateString() });
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
        <div className={`mt-5`}>
          <Label htmlFor="grade" value={`Grade`} />
          <TextInput
            id="grade"
            type={`text`}
            sizing="md"
            name="grade"
            onChange={handleChange}
            value={form.grade ?? ""}
            required
          />
        </div>
      </div>
      {entityName == "users" && (
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
      )}
      {entityName == "users" && (
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
      )}
      <div className="flex flex-col lg:flex-row justify-between items-start  gap-0 lg:gap-3">
        <div className="flex flex-col justify-start items-start mt-5">
          {entityName == "patients" && (
            <div className={`flex flex-col items-start gap-3 mb-5`}>
              <Label value={`Sexe:`} />
              {["homme", "femme"].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Radio
                    id={s}
                    name="sex"
                    value={s}
                    checked={form?.sex == s}
                    onChange={(e) => handleRadioChange(e)}
                    required
                  />
                  <Label htmlFor={s}>{s}</Label>
                </div>
              ))}
            </div>
          )}
          <div className={`flex items-center gap-3`}>
            {person == null || form.active != undefined ? (
              <Checkbox
                id={"active"}
                name="active"
                checked={form.active ?? false}
                onChange={(e) => handleCheckboxChange(e)}
              />
            ) : (
              <Spinner size={"sm"} aria-label="Loading active..." />
            )}
            <Label htmlFor="active" value={`Activé`} />
          </div>
          {entityName == "users" && (
            <div className={`flex items-center gap-3`}>
              {person == null || form.verified != undefined ? (
                <Checkbox
                  id={"verified"}
                  name="verified"
                  checked={form.verified ?? false}
                  onChange={(e) => handleCheckboxChange(e)}
                />
              ) : (
                <Spinner size={"sm"} aria-label="Loading verified..." />
              )}
              <Label htmlFor="verified" value={`Vérifié`} />
            </div>
          )}
        </div>
        {entityName == "patients" && (
          <div className={`mt-5`}>
            <Label htmlFor="birthDate" value={`Date de naissance (mm-dd-yyyy)`} />
            <Datepicker
              sizing={"sm"}
              onSelectedDateChanged={handleDateChange}
              value={form.birthDate ?? new Date().toLocaleDateString()}
              language="fr"
              name=""
              id="birthDate"
              required
            />
          </div>
        )}
      </div>

      {entityName == "users" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          <div className={`mt-5`}>
            <Label htmlFor="institutionId" value={`Institution`} />
            {person == null || form.institutionId ? (
              <Select
                id="institutionId"
                name="institutionId"
                className="input-text md:mb-4 pl-0"
                onChange={handleChange}
                defaultValue={form.institutionId}
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
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spinner className="" aria-label="Loading roles..." />
                <p className="pl-2">Loading Institution...</p>
              </div>
            )}
          </div>
          <div className={`mt-5`}>
            <Label htmlFor="roles" value={`Rôles`} />
            {person == null || form?.roles ? (
              roles?.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
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
      )}
      {entityName == "patients" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          <div className={`mt-5`}>
            <Label htmlFor="user" value={`Thérapeute`} />
            {person == null || form.user ? (
              <Select
                id="user"
                name="user"
                className="input-text md:mb-4 pl-0"
                onChange={handleChange}
                defaultValue={form.user}
                required
              >
                <option value={-1}>Choisir un thérapeute</option>
                {users &&
                  users
                    .sort((a, b) =>
                      a.institution.title.localeCompare(b.institution.title)
                    )
                    .map((user, i) => (
                      <option key={i} value={user.id}>
                        {user.institution.title +
                          " - " +
                          user.firstName.charAt(0) +
                          ". " +
                          user.lastName}
                      </option>
                    ))}
              </Select>
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spinner className="" aria-label="Loading roles..." />
                <p className="pl-2">Loading Thérapeutes...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EntityFormPersonFields;
