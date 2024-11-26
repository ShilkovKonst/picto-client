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
  session,
  entity,
  entityName,
  institutions,
  users,
  roles,
  form,
  setForm,
  handleChange,
}) => {
  console.log(entity);
  console.log("form", form);
  useEffect(() => {
    entityName == "users" &&
      setForm({
        ...form,
        lastName: entity?.lastName ?? "",
        firstName: entity?.firstName ?? "",
        phoneNumber: entity?.phoneNumber ?? "",
        job: entity?.job ?? "",
        active: entity?.active ?? true,
        verified: entity?.verified ?? undefined,
        roles: entity?.roles?.map((r) => r.id) ?? [],
        institutionId: entity?.institution.id ?? -1,
      });
    entityName == "patients" &&
      setForm({
        ...form,
        lastName: entity?.lastName ?? "",
        firstName: entity?.firstName ?? "",
        code: entity?.code ?? "",
        grade: entity?.grade ?? "",
        sex: entity?.sex ?? "",
        active: entity?.active ?? true,
        birthDate: entity?.birthDate
          ? new Date(entity?.birthDate).toLocaleDateString()
          : new Date().toLocaleDateString(),
        userId: entity?.user?.id ?? session.id,
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
      {entityName == "patients" && (
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
      <div className="flex flex-col lg:flex-row justify-between items-start gap-0 lg:gap-3">
        <div className="flex flex-col justify-start items-start">
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
          {(entity?.roles?.includes("ROLE_SUPERADMIN") || entity?.user?.id == session?.id) && (
            <div className={`flex items-center gap-3`}>
              {entity == null || form.active != undefined ? (
                <Checkbox
                  id={"active"}
                  name="active"
                  checked={form.active ?? false}
                  onChange={(e) => handleCheckboxChange(e)}
                />
              ) : (
                <Spinner size={"sm"} aria-label="Loading active..." />
              )}
              <Label htmlFor="active" value={`Actif(ve)`} />
            </div>
          )}
          {entityName == "users" &&
            entity?.roles?.includes("ROLE_SUPERADMIN") && (
              <div className={`flex items-center gap-3`}>
                {entity == null || form.verified != undefined ? (
                  <Checkbox
                    id={"verified"}
                    name="verified"
                    checked={form.verified ?? false}
                    onChange={(e) => handleCheckboxChange(e)}
                  />
                ) : (
                  <Spinner size={"sm"} aria-label="Loading verified..." />
                )}
                <Label htmlFor="verified" value={`Vérifié(e)`} />
              </div>
            )}
        </div>
        {entityName == "patients" && (
          <div>
            <Label htmlFor="birthDate" value={`Date de naissance`} />
            <p className="text-xs font-medium text-gray-900 mb-1">
              (dd-MM-YYYY)
            </p>
            {form.birthDate ? (
              <Datepicker
                sizing={"sm"}
                onSelectedDateChanged={handleDateChange}
                value={new Date(form.birthDate).toLocaleDateString("fr-FR")}
                language="fr-FR"
                name=""
                id="birthDate"
                required
              />
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spinner className="" aria-label="Loading birthDate..." />
                <p className="pl-2">Loading birthDate...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {entityName == "users" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          <div className={`mt-5`}>
            <Label htmlFor="institutionId" value={`Institution`} />
            {form.institutionId ? (
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
          {entity?.roles?.includes("ROLE_SUPERADMIN") && (
            <div className={`mt-5`}>
              <Label htmlFor="roles" value={`Rôles`} />
              {form?.roles ? (
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
          )}
        </div>
      )}
      {entityName == "patients" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          <div className={`mt-5`}>
            <Label htmlFor="userId" value={`Thérapeute`} />
            {form.userId ? (
              <Select
                id="userId"
                name="userId"
                className="input-text md:mb-4 pl-0"
                onChange={handleChange}
                defaultValue={form.userId}
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
                <Spinner className="" aria-label="Loading théraputes..." />
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
