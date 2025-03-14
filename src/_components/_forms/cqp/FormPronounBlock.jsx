"use client";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";
import { tagsMap } from "@/_constants/types";

const FormPronounBlock = ({ form, setForm, tags }) => {
  const pronounTagGroups = [
    ["MASCULIN", "FEMININ", "INDIFFERENT"],
    ["SINGULIER", "PLURIEL"],
    ["PREMIER", "DEUXIEME", "TROISIEME"],
  ];
  const pronounTagsPool = pronounTagGroups.map((group) =>
    tags.filter((t) => group.includes(t.title))
  );

  const handleRadioChange = (e, i) => {
    setForm((prev) => {
      const prevTags = [...prev.tags];
      prevTags[i] = e.target.value;
      return { ...prev, tags: prevTags };
    });
  };

  return (
    <div className={`lg:flex lg:justify-between lg:gap-3 lg:mt-5`}>
      <div>
        <label>Tags:</label>
        <div className="flex justify-between gap-5 mt-2 pr-1">
          {pronounTagsPool.map((group, j) => (
            <div key={j} className="flex flex-col gap-2">
              {group?.map((t, i) => (
                <FormRadioField
                  key={i}
                  name={`tags${j}`}
                  id={t.id}
                  title={tagsMap[t.title]}
                  checked={form?.tags?.includes(t.id.toString())}
                  handleChange={(e) => handleRadioChange(e, j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPronounBlock;
