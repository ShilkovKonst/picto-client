"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { create, update } from "@/_lib/handleEntityModification";
import FormCategoryBlock from "./FormCategoryBlock";
import FormPictogramBlock from "./FormPictogramBlock";
import FormTextAreaField from "@/_components/_forms/shared/FormTextAreaField";
import FormTextField from "@/_components/_forms/shared/FormTextField";
import FormImageField from "@/_components/_forms/shared/FormImageField";
import ConfirmButton from "@/_components/_shared/atoms/ConfirmButton";

const Form = ({
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
    formData.append("title", form.title);
    form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
    switch (entityName) {
      case "categories":
        // form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
        formData.append("supercategoryId", form.supercategoryId);
        formData.append("questions", JSON.stringify(form.questions));
        break;
      case "pictograms":
        // form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
        formData.append("type", form.type);
        formData.append("categoryId", form.categoryId);
        formData.append("tags", JSON.stringify(form.tags));
        form.tags.includes("3") &&
          formData.append("irregular", JSON.stringify(form.irregular));
        break;
    }
    // if (entityName == "categories") {
    //   // categoryFormData(form, formData);
    //   form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
    //   formData.append("supercategoryId", form.supercategoryId);
    //   formData.append("questions", JSON.stringify(form.questions));
    // }
    // if (entityName == "pictograms") {
    //   // pictoFormData(form, formData);
    //   form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
    //   formData.append("type", form.type);
    //   formData.append("categoryId", form.categoryId);
    //   formData.append("tags", JSON.stringify(form.tags));
    //   form.tags.includes("3") &&
    //     formData.append("irregular", JSON.stringify(form.irregular));
    // }
    try {
      // on create
      if (pathname.includes("create")) {
        create(
          router,
          formData,
          entityName,
          setError,
          setErrorMessage,
          setIsLoading
        );
      }
      // on update
      else {
        update(
          entity,
          entityName,
          router,
          formData,
          setError,
          setErrorMessage,
          setIsLoading
        );
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
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        {(entityName == "categories" || entityName == "pictograms") && (
          <FormImageField
            entity={entity}
            entityName={entityName}
            form={form}
            setForm={setForm}
            pathname={pathname}
          />
        )}
        {entityName == "questions" ? (
          <FormTextAreaField
            id={"title"}
            title={"Title:"}
            defaultValue={form.title}
            handleChange={handleChange}
            limit={500}
            length={form.title.length}
          />
        ) : (
          <FormTextField
            id={"title"}
            title={"Title:"}
            defaultValue={form.title}
            handleChange={handleChange}
          />
        )}
      </div>

      {entityName == "categories" && (
        <FormCategoryBlock
          category={entity}
          categories={categories}
          questions={questions}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}

      {entityName == "pictograms" && (
        <FormPictogramBlock
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

export default Form;

// const create = async (router, formData, entityName, setIsLoading) => {
//   const response = await createOne(formData, entityName);
//   // status 201 - created
//   if (response.status == 201) {
//     router.push(`/dashboard/${entityName}/${response.id}`);
//     router.refresh();
//   }
//   if (response.status >= 400) {
//     setIsLoading(false);
//     setError(true);
//     setErrorMessage(response.title);
//   }
// };

// const update = async (entity, entityName, router, formData, setIsLoading) => {
//   const response = await updateOne(entity?.id, entityName, formData);
//   // status 202 - accepted
//   if (response.status == 202) {
//     router.push(`/dashboard/${entityName}/${response.id}`);
//     router.refresh();
//   }
//   if (response.status >= 400) {
//     setIsLoading(false);
//     setError(true);
//     setErrorMessage(response.title);
//   }
// };

// async function createOne(formData, entityName) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/${entityName}`,
//       {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       }
//     );
//     if (!response.ok) {
//       const errorDetails = await response.json();
//       throw new Error(`${errorDetails.message}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Bad credentials:", error.message);
//   }
// }

// async function updateOne(id, entityName, formData) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/${entityName}/${id}`,
//       {
//         method: "PUT",
//         body: formData,
//         credentials: "include",
//       }
//     );
//     if (!response.ok) {
//       const errorDetails = await response.json();
//       throw new Error(`${errorDetails.message}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Bad credentials:", error.message);
//   }
// }
