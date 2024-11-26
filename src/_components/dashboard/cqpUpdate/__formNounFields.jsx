"use client";
import { irregularId } from "@/_constants/picto";
import { Checkbox, Label, Radio, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

const FormNounFields = ({
  form,
  setForm,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleRadioChange,
  handleCheckboxChange,
}) => {
  const nounTagsPool = tags.filter(
    (t) => t.title == "masculin" || t.title == "feminin"
  );
  const [nounTag, setNounTag] = useState(null);

  useEffect(() => {
    if (nounTag != null && !form.tags.includes(nounTag)) {
      // create Set for the tags from tagPool which are not checked
      const excludeIds = new Set(
        nounTagsPool.filter((e) => e.id != nounTag).map((e) => e.id)
      );      
      setForm({
        ...form,
        tags: [
          // filter only the tags which are checked or not presented in the excluded Set, 
          ...form.tags.filter((t) => !excludeIds.has(Number(t)))
          // then add checked tag
          , nounTag
        ],
      });
    }
  }, [nounTag]);

  return (
    <div className={`lg:flex lg:justify-between`}>
      <div className="mt-5 lg:w-2/5 flex flex-col gap-3 lg:gap-0">
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
                    checked={form.tags.includes(t.id.toString())}
                    required
                  />
                  <Label htmlFor={t.id}>{t.title}</Label>
                </div>
              )
          )}
      </div>
      <div className="mt-5 lg:w-2/5 ">
        <div className={"flex items-center gap-2 mb-1"}>
          <Label
            htmlFor={"irregulier"}
            value={`Est-ce que le mot est irregulier?`}
          />
          <Checkbox
            id={"irregulier"}
            value={irregularId(tags)}
            checked={form?.tags?.includes(irregularId(tags)?.toString())}
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
            value={form.irregular.plurial}
            required={isIrregular}
          />
        )}
      </div>
    </div>
  );
};

export default FormNounFields;
