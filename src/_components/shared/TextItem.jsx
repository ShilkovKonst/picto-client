import { Label, TextInput } from "flowbite-react";

const TextItem = ({ id, title, defaultValue, handleChange, inputType }) => {
  return (
    <div>
      <Label htmlFor={id} value={title} />
      <TextInput
        id={id}
        name={id}
        type={inputType ?? `text`}
        sizing="md"
        onChange={handleChange}
        value={defaultValue}
        required
      />
    </div>
  );
};

export default TextItem;
