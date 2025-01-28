import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import { irregularId } from "@/_constants/pictoTypes";
import { Label, TextInput } from "flowbite-react";

const FormAdjectiveBlock = ({
  form,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleCheckboxChange,
  add,
  remove,
}) => {
  return (
    <div className={`lg:flex lg:justify-between lg:gap-3`}>
      <div>
        <Label value={`Tags:`} />
        <div>
          <p>Il n'y a rien à choisir</p>
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
            return handleCheckboxChange(e, "tags", add, remove);
          }}
        />
        {isIrregular && (
          <div className="flex flex-col gap-1 mt-2">
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
              id="plurial"
              type="text"
              sizing="sm"
              placeholder="Pluriel"
              name="plurial"
              onChange={handleChange}
              value={form.irregular.plurial}
              required={isIrregular}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAdjectiveBlock;
