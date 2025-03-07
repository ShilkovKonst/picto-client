import { pictoTypesMap } from "@/_constants/types";

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
      <label htmlFor={id}>{title}</label>
      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="input-text text-sm leading-none focus:ring-primary cursor-pointer"
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
              <option key={i} value={e?.value ?? e}>
                {id == "type" ? (pictoTypesMap[e] ?? e) : (e?.title ?? e)}
              </option>
            )
          )}
      </select>
    </div>
  );
};

export default FormSelectListField;
