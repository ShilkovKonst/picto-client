"use client";
import { Label, Textarea, TextInput, Spinner, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EntityFormImage from "./_entityFormImage";
import EntityFormCatFields from "./_entityFormCatFields";
import EntityFormPictoFields from "./_entityFormPictoFields";
import ConfirmButton from "@/_components/shared/ConfirmButton";
import TextAreaItem from "@/_components/shared/TextAreaItem";
import TextItem from "@/_components/shared/TextItem";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    if (entityName == "categories") {
      // categoryFormData(form, formData);
      form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
      formData.append("supercategoryId", form.supercategoryId);
      formData.append("questions", JSON.stringify(form.questions));
    }
    if (entityName == "pictograms") {
      // pictoFormData(form, formData);
      form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
      formData.append("type", form.type);
      formData.append("categoryId", form.categoryId);
      formData.append("tags", JSON.stringify(form.tags));
      form.tags.includes("3") &&
        formData.append("irregular", JSON.stringify(form.irregular));
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
      className={`mx-auto min-w-[75%] *:*:mt-5 *:*:w-full`}
      onSubmit={handleSubmit}
    >
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        {(entityName == "categories" || entityName == "pictograms") && (
          <EntityFormImage
            entity={entity}
            entityName={entityName}
            form={form}
            setForm={setForm}
            pathname={pathname}
          />
        )}
        {entityName == "questions" ? (
          <TextAreaItem
            id={"title"}
            title={"Title:"}
            defaultValue={form.title}
            handleChange={handleChange}
          />
        ) : (
          <TextItem
            id={"title"}
            title={"Title:"}
            defaultValue={form.title}
            handleChange={handleChange}
          />
        )}
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
      <div className="pt-5">
        <ConfirmButton isLoading={isLoading} />
      </div>
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
