import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import { irregularId } from "@/_constants/types";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import FormTextField from "../shared/FormTextField";

const FormAdjectiveBlock = ({
  form,
  setForm,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
}) => {
  const adjTagsPool = tags.filter(
    (t) => t.title == "AVANT" || t.title == "APRES"
  );
  return (
    <div className={`lg:flex lg:justify-between lg:gap-3`}>
      <div>
        <label>Tags:</label>
        <div>
          {adjTagsPool.map((t, i) => (
            <FormCheckboxField
              key={i}
              id={t.title}
              value={t.id}
              title={
                t.title == "AVANT"
                  ? "Est-ce que l'adjectif peut être positionné avant le nom?"
                  : "Est-ce que l'adjectif peut être positionné après le nom?"
              }
              checked={form?.tags?.includes(t.id?.toString()) ?? false}
              handleChange={(e) =>
                handleCheckboxChange(e, "tags", form, setForm)
              }
            />
          ))}
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
          <div className="flex flex-col gap-1 mt-2">
            <FormTextField
              id={"plurial"}
              defaultValue={form.irregular.plurial}
              title={"Pluriel"}
              withLabel={false}
              handleChange={handleChange}
            />
            <FormTextField
              id={"feminin"}
              defaultValue={form.irregular.feminin}
              title={"Feminin"}
              withLabel={false}
              handleChange={handleChange}
            />
            <FormTextField
              id={"femininPlurial"}
              defaultValue={form.irregular.femininPlurial}
              title={"Feminin Pluriel"}
              withLabel={false}
              handleChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAdjectiveBlock;
