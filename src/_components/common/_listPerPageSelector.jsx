import { Label, Select } from "flowbite-react";

const ListPerPageSelector = ({
  id,
  title,
  handleChange,
  searchParams,
  value,
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={id} value={title} />
      <Select
        id={id}
        onChange={handleChange}
        sizing="sm"
        defaultValue={searchParams.get(value)}
      >
        {[5, 6, 7, 8, 9, 10].map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ListPerPageSelector;
