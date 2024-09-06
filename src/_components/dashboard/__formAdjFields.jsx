import { irregularId } from "@/_constants/picto";
import { Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";

const FormAdjFields = ({
  form,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
  handleCheckboxChange,
}) => {
  return (
    <div className={`lg:flex lg:justify-between`}>
      <fieldset className="mt-5 lg:w-2/5">
        <Label value={`Tags:`} />
        <div>
          <Label value={`Il n'y a rien à choisir`} />
        </div>
      </fieldset>
      <div className="mt-5 lg:w-2/5 ">
        <div className={"flex items-center gap-2 mb-1"}>
          <Label
            htmlFor={"irregulier"}
            value={`Est-ce que le mot est irregulier?`}
          />
          <Checkbox
            id={"irregulier"}
            value={irregularId(tags)}
            checked={form?.tags?.includes(irregularId(tags)?.toString())}
            onChange={(e) => {
              setIsIrregular((prev) => !prev);
              return handleCheckboxChange(e);
            }}
          />
        </div>
        {isIrregular && (
          <div className="flex flex-col gap-1">
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

export default FormAdjFields;
