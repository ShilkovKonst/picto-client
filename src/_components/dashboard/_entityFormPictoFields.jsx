import { getAllAsList } from "@/_helpers/categoryApiHelper";
import { getAll } from "@/_helpers/tagApiHelper";
import { Label, Select } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { types } from "@/_constants/picto";
import FormVerbFields from "./__formVerbFields";
import FormNounFields from "./__formNounFields";
import FormAdjFields from "./__formAdjFields";
import FormPronounFields from "./__formPronounFields";

const EntityFormPictoFields = ({ pictogram, form, setForm, handleChange }) => {
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [isIrregular, setIsIrregular] = useState(false);
  const [tag1, setTag1] = useState(null);
  const [tag2, setTag2] = useState(null);

  const getCategories = async () => {
    const cats = await getAllAsList();
    setCategories(cats);
  };
  const getTags = async () => {
    const tagsList = await getAll();
    setTags(tagsList);
  };

  useEffect(() => {
    setForm({
      ...form,
      type: pictogram?.type ?? -1,
      category: pictogram?.category ?? -1,
      tags: pictogram?.tags ?? [],

      past_participle: pictogram?.irregular?.past_participle ?? "",
      feminin: pictogram?.irregular?.feminin ?? "",
      plurial: pictogram?.irregular?.plurial ?? "",

      present_first_person_singular:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "present")
          ?.first_person_singular ?? "",
      present_second_person_singular:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "present")
          ?.second_person_singular ?? "",
      present_third_person_singular:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "present")
          ?.third_person_singular ?? "",
      present_first_person_plurial:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "present")
          ?.first_person_plurial ?? "",
      present_second_person_plurial:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "present")
          ?.second_person_plurial ?? "",
      present_third_person_plurial:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "present")
          ?.third_person_plurial ?? "",

      futur_first_person_singular:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "futur")
          ?.first_person_singular ?? "",
      futur_second_person_singular:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "futur")
          ?.second_person_singular ?? "",
      futur_third_person_singular:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "futur")
          ?.third_person_singular ?? "",
      futur_first_person_plurial:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "futur")
          ?.first_person_plurial ?? "",
      futur_second_person_plurial:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "futur")
          ?.second_person_plurial ?? "",
      futur_third_person_plurial:
        pictogram?.irregular?.conjugations?.find((c) => c.tense == "futur")
          ?.third_person_plurial ?? "",
    });
    getTags();
    getCategories();
  }, []);

  const addTag = (tagId) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: [...prevForm.tags, tagId],
    }));
  };
  const removeTag = (tagId) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: prevForm.tags.filter((t) => t != tagId),
    }));
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      addTag(e.target.value);
    } else {
      removeTag(e.target.value);
    }
  };

  const handleTypeChange = (e) => {
    setIsIrregular(false);
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
      tags: [],
    }));
  };

  // method to remove old verb tag value from form and add new verb tag value via useEffect
  const handleRadioChange = (e, tag, setTag) => {
    setTag(e.target.value);
    setForm((prevForm) => ({
      ...prevForm,
      tags: [...prevForm.tags.filter((t) => t != tag)],
    }));
  };

  return (
    <>
      <div className={`lg:flex lg:justify-between`}>
        <div className="mt-5 lg:w-2/5">
          <Label htmlFor="category" value={`Catégorie:`} />
          {form.category && categories && (
            <Select
              id="category"
              name="category"
              onChange={handleChange}
              defaultValue={form?.category ?? -1}
              required
            >
              <option value={-1}>Choisir une catégorie</option>
              {categories &&
                categories.map((cat, i) => (
                  <option key={i} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
            </Select>
          )}
        </div>
        <div className="mt-5 lg:w-2/5">
          <Label htmlFor="type" value={`Type:`} />
          {form.category && categories && (
            <Select
              id="type"
              name="type"
              onChange={handleTypeChange}
              defaultValue={form?.type != -1 && form?.type}
              required
            >
              <option value={-1}>Choisir une type</option>
              {types &&
                types.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
            </Select>
          )}
        </div>
      </div>
      {form.type == "verbe" && (
        <FormVerbFields
          form={form}
          setForm={setForm}
          tags={tags}
          verbTag={tag1}
          setVerbTag={setTag1}
          handleChange={handleChange}
          handleRadioChange={handleRadioChange}
          handleCheckboxChange={handleCheckboxChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {form.type == "nom" && (
        <FormNounFields
          form={form}
          setForm={setForm}
          tags={tags}
          nounTag={tag1}
          setNounTag={setTag1}
          handleChange={handleChange}
          handleRadioChange={handleRadioChange}
          handleCheckboxChange={handleCheckboxChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {form.type == "adjectif" && (
        <FormAdjFields
          form={form}
          tags={tags}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {form.type == "pronom_ou_determinant" && (
        <FormPronounFields
          form={form}
          setForm={setForm}
          tags={tags}
          pronounTag1={tag1}
          setPronounTag1={setTag1}
          pronounTag2={tag2}
          setPronounTag2={setTag2}
          handleRadioChange={handleRadioChange}
        />
      )}
    </>
  );
};

export default EntityFormPictoFields;
