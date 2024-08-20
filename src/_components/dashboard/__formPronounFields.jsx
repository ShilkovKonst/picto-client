"use client";
import { Label, Radio } from "flowbite-react";
import React, { useEffect } from "react";

const FormPronounFields = ({
  form,
  setForm,
  tags,
  pronounTag1,
  setPronounTag1,
  pronounTag2,
  setPronounTag2,
  handleRadioChange,
}) => {
  useEffect(() => {
    pronounTag1 != null &&
      setForm((prevForm) => ({
        ...prevForm,
        tags: [...prevForm.tags, pronounTag1],
      }));
  }, [pronounTag1]);

  useEffect(() => {
    pronounTag2 != null &&
      setForm((prevForm) => ({
        ...prevForm,
        tags: [...prevForm.tags, pronounTag2],
      }));
  }, [pronounTag2]);

  return (
    <div className={`lg:flex lg:justify-between`}>
      <fieldset className="mt-5 lg:w-2/5">
        <Label value={`Tags:`} />
        {tags?.map(
          (t, i) =>
            (t.title == "masculin" || t.title == "feminin") && (
              <div key={i} className="flex items-center gap-2">
                <Radio
                  id={t.id}
                  name="tags1"
                  value={t.id}
                  checked={form?.tags?.includes(t.id.toString())}
                  onChange={(e) =>
                    handleRadioChange(e, pronounTag1, setPronounTag1)
                  }
                  required
                />
                <Label htmlFor={t.id}>{t.title}</Label>
              </div>
            )
        )}
        <div className="border-b-2" ></div>
        {tags?.map(
          (t, i) =>
            (t.title == "singulier" || t.title == "pluriel") && (
              <div key={i} className="flex items-center gap-2">
                <Radio
                  id={t.id}
                  name="tags2"
                  value={t.id}
                  checked={form?.tags?.includes(t.id.toString())}
                  onChange={(e) =>
                    handleRadioChange(e, pronounTag2, setPronounTag2)
                  }
                  required
                />
                <Label htmlFor={t.id}>{t.title}</Label>
              </div>
            )
        )}
        <div className="border-b-2" ></div>
      </fieldset>
      <div className="mt-5 lg:w-2/5 "></div>
    </div>
  );
};

export default FormPronounFields;
