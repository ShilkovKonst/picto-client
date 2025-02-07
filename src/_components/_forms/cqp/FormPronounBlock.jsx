"use client";
import FormRadioField from "@/_components/_forms/shared/FormRadioField";

const FormPronounBlock = ({ form, setForm, tags }) => {
  const pronounTagGroups = [
    ["masculin", "feminin", "indifférent"],
    ["singulier", "pluriel"],
    ["premier", "deuxième", "troisième"],
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
    <div className={`lg:flex lg:justify-between lg:gap-3`}>
      <div>
        <label>Tags:</label>
        <div className="flex gap-5 mt-2">
          {pronounTagsPool.map((group, j) => (
            <div key={j} className="flex flex-col gap-2">
              {group?.map((t, i) => (
                <FormRadioField
                  key={i}
                  name={`tags${j}`}
                  id={t.id}
                  title={t.title}
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
