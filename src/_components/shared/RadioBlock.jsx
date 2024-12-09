import { Label, Radio } from "flowbite-react";

const RadioBlock = ({ id, name, checked, handleChange, title }) => {
  return (
    <div className="flex items-center gap-2">
      <Radio
        id={id}
        value={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        required
      />
      <Label htmlFor={id}>{title}</Label>
    </div>
  );
};

export default RadioBlock;
