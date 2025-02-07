"use client";
import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";
import { irregularId } from "@/_constants/types";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

const FormNounBlock = ({
  form,
  setForm,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleRadioChange,
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
          ...form.tags.filter((t) => !excludeIds.has(Number(t))),
          // then add checked tag
          nounTag,
        ],
      });
    }
  }, [nounTag]);

  return (
    <div className={`lg:flex lg:justify-between lg:gap-3`}>
      <div>
        <Label value={`Tags:`} />
        <div className="flex flex-col gap-2 mt-2">
          {tags &&
            tags.map(
              (t, i) =>
                (t.title == "masculin" || t.title == "feminin") && (
                  <FormRadioField
                    key={i}
                    id={t.id}
                    name={"tags"}
                    title={t.title}
                    checked={form.tags.includes(t.id.toString())}
                    handleChange={(e) =>
                      handleRadioChange(e, nounTag, setNounTag)
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
          checked={form?.tags?.includes(irregularId(tags)?.toString()) ?? false}
          handleChange={(e) => {
            setIsIrregular((prev) => !prev);
            return handleCheckboxChange(e, "tags", form, setForm);
          }}
        />
        {isIrregular && (
          <TextInput
            id="plurial"
            onChange={handleChange}
            value={form.irregular.plurial}
            type="text"
            sizing="sm"
            placeholder="Pluriel"
            name="plurial"
            className="mt-2"
            required={isIrregular}
          />
        )}
      </div>
    </div>
  );
};

export default FormNounBlock;
