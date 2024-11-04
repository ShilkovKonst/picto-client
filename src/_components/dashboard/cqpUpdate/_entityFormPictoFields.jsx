import { Label, Select } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { types } from "@/_constants/picto";
import FormVerbFields from "./__formVerbFields";
import FormNounFields from "./__formNounFields";
import FormAdjFields from "./__formAdjFields";
import FormPronounFields from "./__formPronounFields";

const EntityFormPictoFields = ({
  pictogram,
  form,
  setForm,
  handleChange,
  categories,
  tags,
}) => {
  const [isIrregular, setIsIrregular] = useState(false);
  
  useEffect(() => {
    setForm({
      ...form,
      type: pictogram?.type ?? -1,
      category: pictogram?.category ?? -1,
      tags: pictogram?.tags?.map((t) => t.id.toString()) ?? [],
      irregular: {
        pastParticiple: pictogram?.irregular?.pastParticiple ?? "",
        feminin: pictogram?.irregular?.feminin ?? "",
        plurial: pictogram?.irregular?.plurial ?? "",
        conjugations: [
          {
            tense: "present",
            firstSingular:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "present"
              )?.firstSingular ?? "",
            secondSingular:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "present"
              )?.secondSingular ?? "",
            thirdSingular:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "present"
              )?.thirdSingular ?? "",
            firstPlurial:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "present"
              )?.firstPlurial ?? "",
            secondPlurial:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "present"
              )?.secondPlurial ?? "",
            thirdPlurial:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "present"
              )?.thirdPlurial ?? "",
          },
          {
            tense: "futur",
            firstSingular:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "futur"
              )?.firstSingular ?? "",
            secondSingular:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "futur"
              )?.secondSingular ?? "",
            thirdSingular:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "futur"
              )?.thirdSingular ?? "",
            firstPlurial:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "futur"
              )?.firstPlurial ?? "",
            secondPlurial:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "futur"
              )?.secondPlurial ?? "",
            thirdPlurial:
              pictogram?.irregular?.conjugations?.find(
                (c) => c.tense == "futur"
              )?.thirdPlurial ?? "",
          },
        ],
      },
    });
  }, []);
  useEffect(() => {
    setIsIrregular(form?.tags?.includes("3"));
  }, [form]);

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

  const handleIrregularChange = (e) => {
    setForm({
      ...form,
      irregular: { ...form.irregular, [e.target.name]: e.target.value },
    });
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
                categories.sort((a, b) => a.title.localeCompare(b.title)).map((cat, i) => (
                  <option key={i} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
            </Select>
          )}
        </div>
        <div className="mt-5 lg:w-2/5">
          <Label htmlFor="type" value={`Type:`} />
          {form.type && (
            <Select
              id="type"
              name="type"
              onChange={handleTypeChange}
              defaultValue={form?.type}
              required
            >
              <option value={-1}>Choisir une type</option>
              {types &&
                types.sort().map((t, i) => (
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
          handleChange={handleIrregularChange}
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
          handleChange={handleIrregularChange}
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
          handleChange={handleIrregularChange}
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
          handleRadioChange={handleRadioChange}
        />
      )}
    </>
  );
};

export default EntityFormPictoFields;
