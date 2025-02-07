import { useEffect } from "react";
import { Label, Spinner } from "flowbite-react";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import FormTextField from "@/_components/_forms/shared/FormTextField";
import FormDatepickerField from "../shared/FormDatepickerField";
import FormEmailField from "../shared/FormEmailField";
import { roleTypes } from "@/_constants/types";

const FormPersonBlock = ({
  session,
  entity,
  entityName,
  institutions,
  users,
  form,
  setForm,
  handleChange,
}) => {
  console.log(form.firstName != undefined && 1);
  useEffect(() => {
    entityName == "users" &&
      setForm({
        ...form,
        email: entity ? entity?.email : "",
        lastName: entity ? entity?.lastName : "",
        firstName: entity ? entity?.firstName : "",
        phoneNumber: entity ? entity?.phoneNumber : "",
        job: entity ? entity?.job : "",
        active: entity ? entity?.active : true,
        verified: entity ? entity?.verified : false,
        roles: entity ? entity?.roles : [],
        institutionId: entity ? entity?.institution?.id : -1,
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
        birthDate: entity?.birthDate ? new Date(entity?.birthDate) : new Date(),
        userId: entity?.user?.id ?? session.id,
      });
  }, []);

  const addRole = (role) => {
    setForm({
      ...form,
      roles: [...form.roles, role],
    });
  };
  const removeRole = (role) => {
    setForm({
      ...form,
      roles: form.roles.filter((r) => r != role),
    });
  };
  const handleRoleChange = (e, role) => {
    if (e.target.checked) {
      addRole(role);
    } else {
      removeRole(role);
    }
  };
  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.checked });
  };

  const handleRadioChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    date == null
      ? setForm({
          ...form,
          birthDate: new Date(),
        })
      : setForm({ ...form, birthDate: date });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        {form.lastName != undefined ? (
          <FormTextField
            id={"lastName"}
            title={"Nom:"}
            defaultValue={form.lastName ?? ""}
            handleChange={handleChange}
          />
        ) : (
          <Spinner size={"sm"} aria-label="Loading last name..." />
        )}
        {form.firstName != undefined ? (
          <FormTextField
            id={"firstName"}
            title={"Prénom:"}
            defaultValue={form.firstName ?? ""}
            handleChange={handleChange}
          />
        ) : (
          <Spinner size={"sm"} aria-label="Loading first name..." />
        )}
      </div>
      {entityName == "patients" && (
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
          {form.code != undefined ? (
            <FormTextField
              id={"code"}
              title={"Code:"}
              defaultValue={form.code ?? ""}
              handleChange={handleChange}
            />
          ) : (
            <Spinner size={"sm"} aria-label="Loading code..." />
          )}
          {form.grade != undefined ? (
            <FormTextField
              id={"grade"}
              title={"Grade:"}
              defaultValue={form.grade ?? ""}
              handleChange={handleChange}
            />
          ) : (
            <Spinner size={"sm"} aria-label="Loading grade..." />
          )}
        </div>
      )}
      {entityName == "users" && (
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
          {form.phoneNumber != undefined ? (
            <FormTextField
              id={"phoneNumber"}
              title={"Numéro de téléphone:"}
              defaultValue={form.phoneNumber ?? ""}
              handleChange={handleChange}
            />
          ) : (
            <Spinner size={"sm"} aria-label="Loading phone number..." />
          )}
          {form.job != undefined ? (
            <FormTextField
              id={"job"}
              title={"Fonction:"}
              defaultValue={form.job ?? ""}
              handleChange={handleChange}
            />
          ) : (
            <Spinner size={"sm"} aria-label="Loading job..." />
          )}
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-0 lg:gap-3">
        <div className="flex flex-col justify-start items-start">
          {entityName == "patients" && (
            <div className={`flex flex-col items-start gap-1 mb-5`}>
              <Label value={`Sexe:`} />
              {form.sex != undefined ? (
                ["homme", "femme"].map((s, i) => (
                  <FormRadioField
                    key={i}
                    id={s}
                    name={"sex"}
                    checked={form.sex == s}
                    handleChange={(e) => handleRadioChange(e)}
                    title={s}
                  />
                ))
              ) : (
                <Spinner size={"sm"} aria-label="Loading sexe..." />
              )}
            </div>
          )}
          {(session?.roles?.includes("ROLE_ADMIN") ||
            entity?.user?.id == session?.id) &&
          (entity == null || form.active != undefined) ? (
            <FormCheckboxField
              id={"active"}
              value={"active"}
              title={"Actif(ve)"}
              checked={form.active ?? false}
              handleChange={(e) => handleCheckboxChange(e)}
            />
          ) : (
            <Spinner size={"sm"} aria-label="Loading active..." />
          )}
          {entityName == "users" &&
            session?.roles?.includes("ROLE_ADMIN") &&
            (entity == null || form.verified != undefined ? (
              <FormCheckboxField
                id={"verified"}
                value={"verified"}
                title={"Vérifié(e)"}
                checked={form.verified ?? false}
                handleChange={(e) => handleCheckboxChange(e)}
              />
            ) : (
              <Spinner size={"sm"} aria-label="Loading verified..." />
            ))}
        </div>
        {entityName == "patients" && (
          <FormDatepickerField
            id={"birthDate"}
            title={`Date de naissance`}
            defaultValue={form.birthDate}
            handleDateChange={handleDateChange}
          />
        )}
        {entityName == "users" && session?.roles?.includes("ROLE_ADMIN") && (
          <FormEmailField
            id={"email"}
            title={"Email"}
            defaultValue={form.email ?? ""}
            handleChange={handleChange}
          />
        )}
      </div>

      {entityName == "users" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          {form.institutionId ? (
            <FormSelectListField
              id={"institutionId"}
              title={"Institution:"}
              defaultValue={form.institutionId}
              handleChange={handleChange}
              zeroListElement={"Choisir une institution"}
              list={institutions.filter((i) => i.id == session.institution.id)}
            />
          ) : (
            <LoadingSpinner text={"Loading Institution..."} />
          )}
          {session?.roles?.includes("ROLE_ADMIN") && (
            <div>
              <p className="text-sm font-medium text-gray-900">Rôles:</p>
              {form?.roles ? (
                roleTypes
                  ?.filter((r) => {
                    if (session.roles.includes("ROLE_SUPERADMIN")) {
                      return true;
                    }
                    if (session.roles.includes("ROLE_ADMIN")) {
                      return r !== "ROLE_SUPERADMIN";
                    }
                    return false;
                  })
                  ?.map((r, i) => (
                    <FormCheckboxField
                      key={i}
                      id={r}
                      value={r}
                      title={r}
                      checked={form?.roles?.includes(r) ? true : false}
                      handleChange={(e) => handleRoleChange(e, r)}
                    />
                  ))
              ) : (
                <LoadingSpinner text={"Loading roles..."} />
              )}
            </div>
          )}
        </div>
      )}
      {entityName == "patients" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          {form.userId ? (
            <FormSelectListField
              id={"userId"}
              title={"Thérapeute:"}
              defaultValue={form.userId}
              handleChange={handleChange}
              zeroListElement={"Choisir un thérapeute"}
              list={
                session.roles.includes("ROLE_SUPERADMIN")
                  ? users
                  : session.roles.includes("ROLE_ADMIN")
                  ? users.filter(
                      (e) => e.institution.id == session.institution.id
                    )
                  : users.filter((e) => e.id == session.id)
              }
            />
          ) : (
            <LoadingSpinner text={"Loading Thérapeutes..."} />
          )}
        </div>
      )}
    </>
  );
};

export default FormPersonBlock;
