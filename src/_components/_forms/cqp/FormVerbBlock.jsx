"use client";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { irregularId } from "@/_constants/pictoTypes";
import FormConjugationBlock from "./FormConjugationBlock";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";
import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";

const FormVerbBlock = ({
  form,
  setForm,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleRadioChange,
  handleCheckboxChange,
}) => {
  const verbTagsPool = tags.filter(
    (t) => t.title == "auxiliaire_avoir" || t.title == "auxiliaire_etre"
  );

  const [verbTag, setVerbTag] = useState(null);

  useEffect(() => {
    if (verbTag != null && !form.tags.includes(verbTag)) {
      const excludeIds = new Set(
        verbTagsPool.filter((e) => e.id != verbTag).map((e) => e.id)
      );
      setForm({
        ...form,
        tags: [...form.tags.filter((t) => !excludeIds.has(Number(t))), verbTag],
      });
    }
  }, [verbTag]);

  const handleConjugationChange = (e, tense) => {
    setForm({
      ...form,
      irregular: {
        ...form.irregular,
        conjugations: form.irregular.conjugations.map((conjugation) =>
          conjugation.tense === tense
            ? { ...conjugation, [e.target.name]: e.target.value }
            : conjugation
        ),
      },
    });
  };

  return (
    <>
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        <div>
          <Label value={`Tags:`} />
          <div className="flex flex-col gap-2 mt-2">
            {tags &&
              tags.map(
                (t, i) =>
                  (t.title == "auxiliaire_avoir" ||
                    t.title == "auxiliaire_etre") && (
                    <FormRadioField
                      key={i}
                      name={"tags"}
                      id={t.id}
                      title={t.title}
                      checked={form?.tags?.includes(t.id.toString()) ?? false}
                      handleChange={(e) =>
                        handleRadioChange(e, verbTag, setVerbTag)
                      }
                    />
                  )
              )}
          </div>
        </div>
        <div>
          <FormCheckboxField
            id={"irregulier"}
            value={irregularId(tags)}
            title={"Est-ce que le mot est irregulier?"}
            checked={
              form?.tags?.includes(irregularId(tags)?.toString()) ?? false
            }
            handleChange={(e) => {
              setIsIrregular((prev) => !prev);
              return handleCheckboxChange(e);
            }}
          />
          {isIrregular && (
            <TextInput
              id="pastParticiple"
              type="text"
              sizing="sm"
              placeholder="Participe passe"
              name="pastParticiple"
              onChange={handleChange}
              value={form.irregular.pastParticiple}
              className="mt-2"
              required
            />
          )}
        </div>
      </div>
      {isIrregular && (
        <FormConjugationBlock
          form={form}
          handleChange={handleConjugationChange}
          isIrregular={isIrregular}
        />
      )}
    </>
  );
};

export default FormVerbBlock;
