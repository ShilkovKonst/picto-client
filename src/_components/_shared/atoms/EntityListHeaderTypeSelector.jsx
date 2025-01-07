import { catTypeList, pictoTypeList } from "@/_constants/sortLists";
import { Label, Select } from "flowbite-react";

const EntityListHeaderTypeSelector = ({
  entityName,
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
        <option value={"all"}>tous</option>
        {entityName == "categories" &&
          catTypeList.map((type, i) => (
            <option key={i} value={type.value}>
              {type.title}
            </option>
          ))}
        {entityName == "pictograms" &&
          pictoTypeList.map((type, i) => (
            <option key={i} value={type.value}>
              {type.title}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default EntityListHeaderTypeSelector;
