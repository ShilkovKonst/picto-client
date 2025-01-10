import { useState, useEffect } from "react";
import { types } from "@/_constants/pictoTypes";
import FormVerbBlock from "./FormVerbBlock";
import FormNounBlock from "./FormNounBlock";
import FormAdjectiveBlock from "./FormAdjectiveBlock";
import FormPronounBlock from "./FormPronounBlock";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";

const FormPictogramBlock = ({
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
      categoryId: pictogram?.category.id ?? -1,
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
  };

  const handleIrregularChange = (e) => {
    setForm({
      ...form,
      irregular: { ...form.irregular, [e.target.name]: e.target.value },
    });
  };

  return (
    <>
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        {form.categoryId && categories && (
          <FormSelectListField
            id={"categoryId"}
            title={"Catégorie:"}
            defaultValue={form.categoryId}
            handleChange={handleChange}
            zeroListElement={"Choisir une catégorie"}
            list={categories}
          />
        )}
        {form.type && types && (
          <FormSelectListField
            id={"type"}
            title={"Type:"}
            defaultValue={form.type}
            handleChange={handleTypeChange}
            zeroListElement={"Choisir une type"}
            list={types}
          />
        )}
      </div>
      {form.type == "verbe" && (
        <FormVerbBlock
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
        <FormNounBlock
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
        <FormAdjectiveBlock
          form={form}
          tags={tags}
          handleChange={handleIrregularChange}
          handleCheckboxChange={handleCheckboxChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {form.type == "pronom_ou_determinant" && (
        <FormPronounBlock
          form={form}
          setForm={setForm}
          tags={tags}
          handleRadioChange={handleRadioChange}
        />
      )}
    </>
  );
};

export default FormPictogramBlock;