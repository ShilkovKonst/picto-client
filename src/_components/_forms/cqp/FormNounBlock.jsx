"use client";
import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";
import { irregularId, tagsMap } from "@/_constants/types";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import { useEffect, useState } from "react";
import FormTextField from "../shared/FormTextField";

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
    (t) => t.title == "MASCULIN" || t.title == "FEMININ"
  );
  const hTagId = tags.find((t) => t.title == "H_ASPIRE").id;
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
        <label>Tags:</label>
        <div className="flex flex-col gap-2 mt-2">
          {tags &&
            tags.map(
              (t, i) =>
                (t.title == "MASCULIN" || t.title == "FEMININ") && (
                  <FormRadioField
                    key={i}
                    id={t.id}
                    name={"tags"}
                    title={tagsMap[t.title]}
                    checked={form.tags.includes(t.id.toString())}
                    handleChange={(e) =>
                      handleRadioChange(e, nounTag, setNounTag)
                    }
                  />
                )
            )}
          {tags && form?.title?.charAt(0)?.toLowerCase() == "h" && (
            <FormCheckboxField
              id={"hAspire"}
              value={hTagId}
              title={"Est-ce que le mot commence par h aspiré?"}
              checked={form?.tags?.includes(hTagId.toString()) ?? false}
              handleChange={(e) => {
                return handleCheckboxChange(e, "tags", form, setForm);
              }}
            />
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
          <FormTextField
            id={"plurial"}
            defaultValue={form.irregular.plurial}
            title={"Pluriel"}
            withLabel={false}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default FormNounBlock;
