"use client";
import { Checkbox, Label, Radio, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import FormConjFields from "./__formConjFields";
import { irregularId } from "@/_constants/picto";

const FormVerbFields = ({
  form,
  setForm,
  tags,
  verbTag,
  setVerbTag,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleRadioChange,
  handleCheckboxChange,
}) => {
  useEffect(() => {
    verbTag != null &&
      setForm((prevForm) => ({
        ...prevForm,
        tags: [...prevForm.tags, verbTag],
      }));
  }, [verbTag]);

  return (
    <>
      <div className={`lg:flex lg:justify-between`}>
        <fieldset className="mt-5 lg:w-2/5">
          <Label value={`Tags:`} />
          {tags &&
            tags.map(
              (t, i) =>
                (t.title == "auxiliaire_avoir" ||
                  t.title == "auxiliaire_etre") && (
                  <div key={i} className="flex items-center gap-2">
                    <Radio
                      id={t.id}
                      name="tags"
                      value={t.id}
                      onChange={(e) =>
                        handleRadioChange(e, verbTag, setVerbTag)
                      }
                      checked={form?.tags?.includes(t.id.toString())}
                      required
                    />
                    <Label htmlFor={t.id}>{t.title}</Label>
                  </div>
                )
            )}
        </fieldset>
        <div className="mt-5 lg:w-2/5 ">
          <div className={"flex items-center gap-2 mb-1"}>
            <Label
              htmlFor={"irregulier"}
              value={`Est-ce que le mot est irregulier?`}
            />
            <Checkbox
              id={"irregulier"}
              value={irregularId(tags)}
              checked={form?.tags?.includes(irregularId(tags).toString())}
              onChange={(e) => {
                setIsIrregular((prev) => !prev);
                return handleCheckboxChange(e);
              }}
            />
          </div>
          {isIrregular && (
            <TextInput
              id="past_participle"
              type="text"
              sizing="sm"
              placeholder="Participe passe"
              name="past_participle"
              onChange={handleChange}
              value={form.past_participle}
              required
            />
          )}
        </div>
      </div>
      {isIrregular && (
        <FormConjFields
          form={form}
          handleChange={handleChange}
          isIrregular={isIrregular}
        />
      )}
    </>
  );
};

export default FormVerbFields;
