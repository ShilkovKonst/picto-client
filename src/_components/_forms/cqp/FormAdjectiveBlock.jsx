import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import { irregularId } from "@/_constants/types";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import { Label, TextInput } from "flowbite-react";

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
        <Label value={`Tags:`} />
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
            <TextInput
              id="feminin"
              type="text"
              sizing="sm"
              placeholder="Feminin"
              name="feminin"
              onChange={handleChange}
              value={form.irregular.feminin}
              required={isIrregular}
            />
            <TextInput
              id="femininPlurial"
              type="text"
              sizing="sm"
              placeholder="Feminin Pluriel"
              name="femininPlurial"
              onChange={handleChange}
              value={form.irregular.femininPlurial}
              required={isIrregular}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAdjectiveBlock;
