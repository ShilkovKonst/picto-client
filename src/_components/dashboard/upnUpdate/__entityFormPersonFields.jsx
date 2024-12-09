import CheckboxBlock from "@/_components/shared/CheckboxBlock";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import RadioBlock from "@/_components/shared/RadioBlock";
import SelectList from "@/_components/shared/SelectList";
import TextItem from "@/_components/shared/TextItem";
import {
  Datepicker,
  Label,
  Spinner,
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
        institutionId: entity?.institution?.id ?? -1,
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
    setForm({ ...form, birthDate: date });
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
        <TextItem
          id={"lastName"}
          title={"Nom:"}
          defaultValue={form.lastName}
          handleChange={handleChange}
        />
        <TextItem
          id={"firstName"}
          title={"Prénom:"}
          defaultValue={form.firstName}
          handleChange={handleChange}
        />
      </div>
      {entityName == "patients" && (
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
          <TextItem
            id={"code"}
            title={"Code:"}
            defaultValue={form.code}
            handleChange={handleChange}
          />
          <TextItem
            id={"grade"}
            title={"Grade:"}
            defaultValue={form.grade}
            handleChange={handleChange}
          />
        </div>
      )}
      {entityName == "users" && (
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-0 lg:gap-3">
          <TextItem
            id={"phoneNumber"}
            title={"Numéro de téléphone:"}
            defaultValue={form.phoneNumber}
            handleChange={handleChange}
          />
          <TextItem
            id={"job"}
            title={"Fonction:"}
            defaultValue={form.job}
            handleChange={handleChange}
          />
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-0 lg:gap-3">
        <div className="flex flex-col justify-start items-start">
          {entityName == "patients" && (
            <div className={`flex flex-col items-start gap-1 mb-5`}>
              <Label value={`Sexe:`} />
              {["homme", "femme"].map((s, i) => (
                <RadioBlock
                  key={i}
                  id={s}
                  name={"sex"}
                  checked={form.sex == s}
                  handleChange={(e) => handleRadioChange(e)}
                  title={s}
                />
              ))}
            </div>
          )}
          {(session?.roles?.includes("ROLE_ADMIN") || //  <-- ROLE_SUPERADMIN
            entity?.user?.id == session?.id) &&
          (entity == null || form.active != undefined) ? (
            <CheckboxBlock
              id={"active"}
              title={"Actif(ve)"}
              checked={form.active ?? false}
              handleChange={(e) => handleCheckboxChange(e)}
            />
          ) : (
            <Spinner size={"sm"} aria-label="Loading active..." />
          )}
          {entityName == "users" &&
            session?.roles?.includes("ROLE_ADMIN") && // <-- ROLE_SUPERADMIN
            (entity == null || form.verified != undefined ? (
              <CheckboxBlock
                id={"verified"}
                title={"Vérifié(e)"}
                checked={form.verified ?? false}
                handleChange={(e) => handleCheckboxChange(e)}
              />
            ) : (
              <Spinner size={"sm"} aria-label="Loading verified..." />
            ))}
        </div>
        {entityName == "patients" && (
          <div>
            <Label htmlFor="birthDate" value={`Date de naissance`} />
            {form.birthDate ? (
              <Datepicker
                sizing={"sm"}
                onChange={handleDateChange}
                value={form.birthDate}
                language="fr-FR"
                name="birthDate"
                id="birthDate"
                required
              />
            ) : (
              <LoadingSpinner text={"Loading birth date..."} />
            )}
          </div>
        )}
      </div>

      {entityName == "users" && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3">
          {form.institutionId ? (
            <SelectList
              id={"institutionId"}
              title={"Institution:"}
              defaultValue={form.institutionId}
              handleChange={handleChange}
              zeroListElement={"Choisir une institution"}
              list={institutions}
            />
          ) : (
            <LoadingSpinner text={"Loading Institution..."} />
          )}
          {session?.roles?.includes("ROLE_ADMIN") && ( // <-- ROLE_SUPERADMIN
            <div>
              <p>Rôles:</p>
              {form?.roles ? (
                roles
                  ?.filter((r) => {
                    if (session.roles.includes("ROLE_SUPERADMIN")) {
                      return true;
                    }
                    if (session.roles.includes("ROLE_ADMIN")) {
                      return r.title !== "ROLE_SUPERADMIN";
                    }
                    return false;
                  })
                  ?.map((r, i) => (
                    <CheckboxBlock
                      key={i}
                      id={r.id}
                      title={r.title}
                      checked={form?.roles?.includes(r.id) ? true : false}
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
            <SelectList
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

export default EntityFormPersonFields;
