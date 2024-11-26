"use client";
import { Label, Radio } from "flowbite-react";
import React, { useEffect, useState } from "react";

const FormPronounFields = ({ form, setForm, tags, handleRadioChange }) => {
  const pronounTagsPool1 = tags.filter(
    (t) => t.title == "masculin" || t.title == "feminin"
  );
  const pronounTagsPool2 = tags.filter(
    (t) => t.title == "singulier" || t.title == "pluriel"
  );
  const [pronounTag1, setPronounTag1] = useState(null);
  const [pronounTag2, setPronounTag2] = useState(null);

  useEffect(() => {
    if (pronounTag1 != null && !form.tags.includes(pronounTag1)) {
      const excludeIds = new Set(
        pronounTagsPool1.filter((e) => e.id != pronounTag1).map((e) => e.id)
      );
      setForm({
        ...form,
        tags: [
          ...form.tags.filter((t) => !excludeIds.has(Number(t))),
          pronounTag1,
        ],
      });
    }
  }, [pronounTag1]);

  useEffect(() => {
    if (pronounTag2 != null && !form.tags.includes(pronounTag2)) {
      const excludeIds = new Set(
        pronounTagsPool2.filter((e) => e.id != pronounTag2).map((e) => e.id)
      );
      setForm({
        ...form,
        tags: [
          ...form.tags.filter((t) => !excludeIds.has(Number(t))),
          pronounTag2,
        ],
      });
    }
  }, [pronounTag2]);

  return (
    <div className={`lg:flex lg:justify-between`}>
      <fieldset className="mt-5 lg:w-2/5 flex flex-col gap-3 lg:gap-0">
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
        <div className="border-b-2"></div>
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
        <div className="border-b-2"></div>
      </fieldset>
      <div className="mt-5 lg:w-2/5 "></div>
    </div>
  );
};

export default FormPronounFields;
