import { Label, Select } from "flowbite-react";

const FormSelectListField = ({
  id,
  title,
  defaultValue,
  handleChange,
  zeroListElement,
  list,
}) => {
  return (
    <div>
      <Label htmlFor={id} value={title} />
      <Select
        id={id}
        name={id}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="*:*:input-text focus:*:*:ring-primary *:*:cursor-pointer"
        required
      >
        <option value={-1}>{zeroListElement}</option>
        {list
          ?.sort((a, b) =>
            a.title
              ? a.title.localeCompare(b.title)
              : a.institution
              ? a.institution.title.localeCompare(b.institution.title)
              : a.lastName
              ? a.lastName.localeCompare(b.lastName)
              : a.localeCompare(b)
          )
          ?.map((e, i) =>
            e.id ? (
              <option key={i} value={e.id}>
                {id == "userId"
                  ? e.institution.title +
                    " - " +
                    e.firstName.charAt(0) +
                    ". " +
                    e.lastName
                  : id == "patientId"
                  ? e.firstName.charAt(0) + ". " + e.lastName
                  : e.title}
              </option>
            ) : (
              <option key={i} value={e}>
                {e}
              </option>
            )
          )}
      </Select>
    </div>
  );
};

export default FormSelectListField;
