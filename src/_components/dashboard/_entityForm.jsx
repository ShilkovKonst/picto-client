"use client";
import { Label, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EntityFormImage from "./_entityFormImage";
import EntityFormCatFields from "./_entityFormCatFields";
import EntityFormPictoFields from "./_entityFormPictoFields";
import { categoryFormData, pictoFormData } from "@/_helpers/submitHelper";

const EntityForm = ({
  entity,
  entityName,
  pathname,
  categories,
  questions,
  tags,
}) => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: entity ? entity?.title : "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    if (entityName == "categories") {
      categoryFormData(form, formData);
    }
    if (entityName == "pictograms") {
      pictoFormData(form, formData);
    }
    try {
      // on create
      if (pathname.includes("create")) {
        create(router, formData, entityName);
      }
      // on update
      else {
        update(entity, entityName, router, formData);
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
      className={`${entityName != "pictograms" ? "max-w-sm" : ""} mx-auto`}
      onSubmit={handleSubmit}
    >
      <div
        className={`${
          entityName == "pictograms" ? "lg:flex lg:justify-between" : ""
        }`}
      >
        {(entityName == "categories" || entityName == "pictograms") && (
          <EntityFormImage
            entity={entity}
            entityName={entityName}
            form={form}
            setForm={setForm}
            pathname={pathname}
          />
        )}
        <div
          className={`mt-5 ${
            entityName == "questions" || entityName == "tags"
              ? "w-full"
              : "lg:w-2/5"
          }`}
        >
          <Label htmlFor="title" value={`Title`} />
          {entityName == "questions" ? (
            <Textarea 
              id="title"
              type={`text`}
              sizing="md"
              name="title"
              onChange={handleChange}
              value={form.title}
              required
            />
          ) : (
            <TextInput
              id="title"
              type={`text`}
              sizing="md"
              name="title"
              onChange={handleChange}
              value={form.title}
              required
            />
          )}
        </div>
      </div>

      {entityName == "categories" && (
        <EntityFormCatFields
          category={entity}
          categories={categories}
          questions={questions}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}

      {entityName == "pictograms" && (
        <EntityFormPictoFields
          pictogram={entity}
          categories={categories}
          tags={tags}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}
      <button
        type="submit"
        className="text-white bg-pbg hover:bg-pred transition ease-in-out duration-300 font-medium rounded-lg text-sm w-full mt-5 px-5 py-2.5 text-center"
      >
        Confirmer
      </button>
    </form>
  );
};

export default EntityForm;

const create = async (router, formData, entityName) => {
  const response = await createOne(formData, entityName);
  router.push(`/dashboard/${entityName}/${response.id}`);
};

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
    return response.json();
  } catch (error) {
    console.error("Bad credentials:", error.message);
  }
}

const update = async (entity, entityName, router, formData) => {
  const response = await updateOne(entity?.id, entityName, formData);
  router.push(`/dashboard/${entityName}/${response.id}`);
};

async function updateOne(id, entityName, formData) {
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
    return response.json();
  } catch (error) {
    console.error("Bad credentials:", error.message);
  }
}
