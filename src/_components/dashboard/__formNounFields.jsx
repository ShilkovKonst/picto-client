"use client";
import { irregularId } from "@/_constants/picto";
import { Checkbox, Label, Radio, TextInput } from "flowbite-react";
import React, { useEffect } from "react";

const FormNounFields = ({
  form,
  setForm,
  tags,
  nounTag,
  setNounTag,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleRadioChange,
  handleCheckboxChange,
}) => {
  
  useEffect(() => {
    nounTag != null &&
      setForm((prevForm) => ({
        ...prevForm,
        tags: [...prevForm.tags, nounTag],
      }));
  }, [nounTag]);

  return (
    <div className={`lg:flex lg:justify-between`}>
      <fieldset className="mt-5 lg:w-2/5">
        <Label value={`Tags:`} />
        {tags &&
          tags.map(
            (t, i) =>
              (t.title == "masculin" || t.title == "feminin") && (
                <div key={i} className="flex items-center gap-2">
                  <Radio
                    id={t.id}
                    name="tags"
                    value={t.id}
                    onChange={(e) => handleRadioChange(e, nounTag, setNounTag)}                    
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
            id="plurial"
            type="text"
            sizing="sm"
            placeholder="Pluriel"
            name="plurial"
            onChange={handleChange}
            value={form.plurial}
            required={isIrregular}
          />
        )}
      </div>
    </div>
  );
};

export default FormNounFields;
