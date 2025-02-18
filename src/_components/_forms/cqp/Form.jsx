"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { create, update } from "@/_lib/handleEntityModification";
import FormCategoryBlock from "./FormCategoryBlock";
import FormPictogramBlock from "./FormPictogramBlock";
import FormTextAreaField from "@/_components/_forms/shared/FormTextAreaField";
import FormTextField from "@/_components/_forms/shared/FormTextField";
import FormImageField from "@/_components/_forms/shared/FormImageField";
import ConfirmButton from "@/_components/shared/ConfirmButton";
import FormQuestionBlock from "./FormQuestionBlock";
import { irregularId } from "@/_constants/types";

const Form = ({
  session,
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
    console.log("form after submit", form);
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    switch (entityName) {
      case "categories":
        form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
        formData.append("supercategoryId", form.supercategoryId);
        break;
      case "pictograms":
        form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
        formData.append("type", form.type);
        formData.append("categoryId", form.categoryId);
        formData.append("tags", JSON.stringify(form.tags));
        formData.append("questions", JSON.stringify(form.questions));
        form.tags.includes(irregularId(tags).toString()) &&
          formData.append("irregular", JSON.stringify(form.irregular));
        // console.log("formData submit start", formData.get("irregular"));
        break;
      case "questions":
        formData.append("tense", form.tense);
        formData.append("pictograms", JSON.stringify(form.pictograms));
        // console.log("formData submit start", formData.get("pictograms"));
        break;
    }
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
          router,
          session,
          formData,
          entity,
          entityName,
          setError,
          setErrorMessage,
          setIsLoading
        );
      }
      router.refresh();
    } catch (error) {
      setIsLoading(false);
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
          questions={questions}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}

      {entityName == "questions" && (
        <FormQuestionBlock
          question={entity}
          categories={categories}
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
