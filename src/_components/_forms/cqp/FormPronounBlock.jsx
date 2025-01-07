"use client";
import { useEffect, useState } from "react";
import { Label } from "flowbite-react";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";

const FormPronounBlock = ({ form, setForm, tags, handleRadioChange }) => {
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
    <div className={`lg:flex lg:justify-between lg:gap-3`}>
      <div>
        <Label value={`Tags:`} />
        <div className="flex gap-3 mt-2">
          <div className="flex flex-col gap-2">
            {tags?.map(
              (t, i) =>
                (t.title == "masculin" || t.title == "feminin") && (
                  <FormRadioField
                    key={i}
                    name={"tags1"}
                    id={t.id}
                    title={t.title}
                    checked={form?.tags?.includes(t.id.toString())}
                    handleChange={(e) =>
                      handleRadioChange(e, pronounTag1, setPronounTag1)
                    }
                  />
                )
            )}
          </div>
          <div className="border-r-2"></div>
          <div className="flex flex-col gap-2">
            {tags?.map(
              (t, i) =>
                (t.title == "singulier" || t.title == "pluriel") && (
                  <FormRadioField
                    key={i}
                    name={"tags2"}
                    id={t.id}
                    title={t.title}
                    checked={form?.tags?.includes(t.id.toString())}
                    handleChange={(e) =>
                      handleRadioChange(e, pronounTag2, setPronounTag2)
                    }
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPronounBlock;
