import { Label, Textarea } from "flowbite-react";

const TextAreaItem = ({ id, title, defaultValue, handleChange }) => {
  return (
    <div>
      <Label htmlFor={id} value={title} />
      <Textarea
        id={id}
        name={id}
        type={`text`}
        sizing="md"
        onChange={handleChange}
        value={defaultValue}
        rows={3}
        required
      />
    </div>
  );
};

export default TextAreaItem;
