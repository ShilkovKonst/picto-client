import { Checkbox, Label } from "flowbite-react";

const CheckboxBlock = ({ id, checked, handleChange, title }) => {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={id}
        value={id}
        checked={checked}
        onChange={handleChange}
      />
      <Label htmlFor={id}>{title}</Label>
    </div>
  );
};

export default CheckboxBlock;
