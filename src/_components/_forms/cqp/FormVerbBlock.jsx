"use client";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import FormConjugationBlock from "./FormConjugationBlock";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";
import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import { irregularId, tagsMap } from "@/_constants/types";

const FormVerbBlock = ({
  form,
  setForm,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleRadioChange,
}) => {
  const verbTagsPool = tags.filter(
    (t) => t.title == "AUXILIAIRE_AVOIR" || t.title == "AUXILIAIRE_ETRE"
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

  return (
    <>
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        <div>
          <Label value={`Tags:`} />
          <div className="flex flex-col gap-2 mt-2">
            {tags &&
              tags.map(
                (t, i) =>
                  (t.title == "AUXILIAIRE_AVOIR" ||
                    t.title == "AUXILIAIRE_ETRE") && (
                    <FormRadioField
                      key={i}
                      name={"tags"}
                      id={t.id}
                      title={tagsMap[t.title]}
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
              return handleCheckboxChange(e, "tags", form, setForm);
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
          setForm={setForm}
          isIrregular={isIrregular}
        />
      )}
    </>
  );
};

export default FormVerbBlock;
