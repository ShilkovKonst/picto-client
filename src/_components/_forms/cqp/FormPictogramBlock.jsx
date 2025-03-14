import { useState, useEffect } from "react";
import {
  conjugationNumbers,
  conjugationPersons,
  conjugationTenses,
  irregularId,
  pictoTypes,
} from "@/_constants/types";
import FormVerbBlock from "./FormVerbBlock";
import FormNounBlock from "./FormNounBlock";
import FormAdjectiveBlock from "./FormAdjectiveBlock";
import FormPronounBlock from "./FormPronounBlock";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import FormCheckboxField from "../shared/FormCheckboxField";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";

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

  const conjugations = {};
  for (let t of conjugationTenses) {
    for (let n of conjugationNumbers) {
      for (let p of conjugationPersons) {
        conjugations[t + "_" + n + "_" + p] =
          pictogram?.irregular?.conjugations[t + "_" + n + "_" + p] ?? "";
      }
    }
  }
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
        femininPlurial: pictogram?.irregular?.femininPlurial ?? "",
        plurial: pictogram?.irregular?.plurial ?? "",
        conjugations: pictogram?.irregular?.conjugations ?? {},
      },
    });
  }, []);

  useEffect(() => {
    setIsIrregular(form?.tags?.includes(irregularId(tags)?.toString()));
  }, [form]);

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
    console.log(e.target.name, e.target.value)
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
        {form.type && pictoTypes && (
          <FormSelectListField
            id={"type"}
            title={"Type:"}
            defaultValue={form.type}
            handleChange={handleTypeChange}
            zeroListElement={"Choisir une type"}
            list={pictoTypes}
          />
        )}
      </div>
      {form.type == "VERBE" && (
        <FormVerbBlock
          form={form}
          setForm={setForm}
          tags={tags}
          handleChange={handleIrregularChange}
          handleRadioChange={handleRadioChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {form.type == "NOM" && (
        <FormNounBlock
          form={form}
          setForm={setForm}
          tags={tags}
          handleChange={handleIrregularChange}
          handleRadioChange={handleRadioChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {form.type == "ADJECTIF" && (
        <FormAdjectiveBlock
          form={form}
          setForm={setForm}
          tags={tags}
          handleChange={handleIrregularChange}
          isIrregular={isIrregular}
          setIsIrregular={setIsIrregular}
        />
      )}
      {(form.type == "PRONOM" || form.type == "DETERMINANT") && (
        <FormPronounBlock form={form} setForm={setForm} tags={tags} />
      )}
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        <div>
          <label>Questions:</label>
          <div className="">
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
                    handleCheckboxChange(e, "questions", form, setForm)
                  }
                />
              ))
            ) : (
              <LoadingSpinner text={"Loading questions..."} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPictogramBlock;
