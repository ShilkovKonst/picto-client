import { useState, useEffect } from "react";
import { types } from "@/_constants/pictoTypes";
import FormVerbBlock from "./FormVerbBlock";
import FormNounBlock from "./FormNounBlock";
import FormAdjectiveBlock from "./FormAdjectiveBlock";
import FormPronounBlock from "./FormPronounBlock";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import { Label } from "flowbite-react";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import FormCheckboxField from "../shared/FormCheckboxField";

const FormPictogramBlock = ({
  pictogram,
  form,
  setForm,
  handleChange,
  categories,
  tags,
  questions,
}) => {
  const [isIrregular, setIsIrregular] = useState(false);
  console.log(form)
  useEffect(() => {
    setForm({
      ...form,
      type: pictogram?.type ?? -1,
      categoryId: pictogram?.category.id ?? -1,
      tags: pictogram?.tags?.map((t) => t.id.toString()) ?? [],
      questions: pictogram?.questions.map((q) => q?.toString()) ?? [],
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

  const remove = (field, value) => {
    setForm({
      ...form,
      [field]: form[field].filter((item) => item != value),
    });
  };
  const add = (field, value) => {
    console.log(value);
    setForm({
      ...form,
      [field]: [...form[field], value],
    });
  };
  const handleCheckboxChange = (e, field, add, remove) => {
    if (e.target.checked) {
      add(field, e.target.value);
    } else {
      remove(field, e.target.value);
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
          add={add}
          remove={remove}
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
          add={add}
          remove={remove}
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
          add={add}
          remove={remove}
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
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        <div>
          <label>Questions:</label>
          {form?.questions ? (
            questions.length > 0 &&
            questions.map((q, i) => (
              <FormCheckboxField
                key={i}
                id={"q" + q.id}
                value={q.id}
                title={q.title}
                checked={
                  form?.questions?.includes(q.id.toString()) ? true : false
                }
                handleChange={(e) =>
                  handleCheckboxChange(e, "questions", add, remove)
                }
              />
            ))
          ) : (
            <LoadingSpinner text={"Loading questions..."} />
          )}
        </div>
      </div>
    </>
  );
};

export default FormPictogramBlock;
