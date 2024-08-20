"use client";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import EntityFormImage from "./_entityFormImage";
import EntityFormCatFields from "./_entityFormCatFields";
import {
  createCategory,
  createQuestion,
  updateCategory,
  updateQuestion,
} from "@/_helpers/submitHelper";
import EntityFormPictoFields from "./_entityFormPictoFields";

const EntityForm = ({ entity, entityName, pathname }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: entity ? entity?.title : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    if (entityName == "categories") {
      form.imageFile && formData.append("imageFile", form.imageFile);
      formData.append("supercategory", form.supercategory);
      formData.append("questions", JSON.stringify(form.questions));
    }
    if (entityName == "pictograms") {
      form.imageFile && formData.append("imageFile", form.imageFile);
      formData.append("type", form.type);
      formData.append("category", form.category);
      formData.append("tags", JSON.stringify(form.tags));
      
      formData.append("past_participle", form.past_participle);
      formData.append("feminin", form.feminin);
      formData.append("plurial", form.plurial);

      formData.append("present_first_person_singular", form.present_first_person_singular);
      formData.append("present_second_person_singular", form.present_second_person_singular);
      formData.append("present_third_person_singular", form.present_third_person_singular);
      formData.append("present_first_person_plurial", form.present_first_person_plurial);
      formData.append("present_second_person_plurial", form.present_second_person_plurial);
      formData.append("present_third_person_plurial", form.present_third_person_plurial);
      
      formData.append("futur_first_person_singular", form.futur_first_person_singular);
      formData.append("futur_second_person_singular", form.futur_second_person_singular);
      formData.append("futur_third_person_singular", form.futur_third_person_singular);
      formData.append("futur_first_person_plurial", form.futur_first_person_plurial);
      formData.append("futur_second_person_plurial", form.futur_second_person_plurial);
      formData.append("futur_third_person_plurial", form.futur_third_person_plurial);

    }
    try {
      // on create category
      if (pathname.includes("create")) {
        entityName == "categories" && createCategory(router, formData);
        entityName == "questions" && createQuestion(router, formData);
      }
      // on update category
      else {
        entityName == "categories" && updateCategory(entity, router, formData);
        entityName == "questions" && updateQuestion(entity, router, formData);
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
        <div className="mt-5 lg:w-2/5">
          <Label htmlFor="title" value={`Title`} />
          <TextInput
            id="title"
            type="text"
            sizing="md"
            name="title"
            onChange={handleChange}
            value={form.title}
            required
          />
        </div>
      </div>

      {entityName == "categories" && (
        <EntityFormCatFields
          category={entity}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}

      {entityName == "pictograms" && (
        <EntityFormPictoFields
          question={entity}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-5 px-5 py-2.5 text-center"
      >
        Confirmer
      </button>
    </form>
  );
};

export default EntityForm;
