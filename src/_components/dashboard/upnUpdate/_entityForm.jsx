"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EntityFormInstitutionFields from "./__entityFormInstitutionFields";
import EntityFormPersonFields from "./__entityFormPersonFields";
import { Spinner } from "flowbite-react";
import EntityFormNoteFields from "./__entityFormNoteFields";
import ConfirmButton from "@/_components/shared/ConfirmButton";

const EntityForm = ({
  session,
  entity,
  entityName,
  pathname,
  institutions,
  users,
  roles,
  patients,
  patient,
}) => {
  const router = useRouter();

  const [form, setForm] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    console.log("form from submit", form);
    switch (entityName) {
      case "institutions":
        formData.append("title", form.title);
        formData.append("contactName", form.contactName);
        formData.append("email", form.email);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("code", form.code);
        break;
      case "users":
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("job", form.job);
        formData.append("active", JSON.stringify(form.active));
        formData.append("verified", JSON.stringify(form.verified));
        formData.append("roles", JSON.stringify(form.roles));
        formData.append("institutionId", form.institutionId);
        break;
      case "patients":
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("code", form.code);
        formData.append("sex", form.sex);
        formData.append("grade", form.grade);
        formData.append("active", JSON.stringify(form.active));
        formData.append("birthDate", form.birthDate.toLocaleDateString("fr-FR"));
        formData.append("userId", form.userId);
        break;
      case "notes":
        formData.append("estimation", form.estimation);
        formData.append("comment", form.comment);
        formData.append("userId", form.userId);
        formData.append("patientId", form.patientId);
        break;
      default:
        break;
    }
    try {
      // on create
      if (pathname.includes("create")) {        
        const response = await createOne(formData, entityName);
        console.log("response createOne", response);
        response.status == 201 &&
          router.push(`/dashboard/${entityName}/${response.id}`);
        if (response.status >= 400) {
          setError(true);
          setErrorMessage(response.title);
        }
      }
      // on update
      else {
        const response = await updateOne(
          entity.id,
          entityName,
          formData,
          router
        );
        console.log("response updateOne", response);
        response.status == 202 &&
          (entityName == "users" && session.id == entity.id
            ? router.push(`/dashboard`)
            : router.push(`/dashboard/${entityName}/${response.id}`));
        if (response.status >= 400) {
          setError(true);
          setErrorMessage(response.title);
        }
      }
      router.refresh();
    } catch (error) {
      throw new Error(
        "Une erreur s'est produite lors de l'envoi du message. " + error.message
      );
    }
  };

  return (
    <form
      className={`mx-auto min-w-[75%] *:*:mt-5 *:*:w-full`}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="text-red-600 mx-auto">
          <span className="font-semibold pr-1">Invalid credentials:</span>
          {errorMessage}
        </div>
      )}
      {entityName == "institutions" && (
        <EntityFormInstitutionFields
          institution={entity}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}

      {(entityName == "users" || entityName == "patients") && (
        <EntityFormPersonFields
          session={session}
          entity={entity}
          entityName={entityName}
          users={users}
          institutions={institutions}
          roles={roles}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}

      {entityName == "notes" && (
        <EntityFormNoteFields
          session={session}
          note={entity}
          users={users}
          patients={patients}
          patient={patient}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}
      <div className="pt-5">
        <ConfirmButton isLoading={isLoading} />
      </div>
    </form>
  );
};

export default EntityForm;

async function createOne(formData, entityName) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/${entityName}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`${errorDetails.message}`);
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Bad credentials:", error.message);
  }
}

async function updateOne(id, entityName, formData, router) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/${entityName}/${id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`${errorDetails.message}`);
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Bad credentials:", error.message);
  }
}
