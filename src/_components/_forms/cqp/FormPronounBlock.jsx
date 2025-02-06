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
          {/* <div className="flex flex-col gap-2">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FormPronounBlock;

// for (let i = 0; i < pronounTags.length; i++) {
//   console.log(
//     "pronounTags[i] && prevTags.includes(pronounTags[i])",
//     pronounTags[i],
//     prevTags.includes(pronounTags[i]),
//     pronounTags[i] && !prevTags.includes(pronounTags[i])
//   );
//   if (pronounTags[i] && !prevTags.includes(pronounTags[i])) {
//     const excludeIds = new Set(
//       pronounTagsPool[i]
//         .filter((e) => e.id !== pronounTagsPool[i].id)
//         .map((e) => e.id)
//     );
//     prevTags.push(pronounTags[i]);
//     return {
//       ...prev,
//       tags: prevTags.filter((t) => !excludeIds.has(Number(t))),
//     };
//   }
// }
// return prev;
