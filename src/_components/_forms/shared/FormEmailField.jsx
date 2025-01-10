const FormEmailField = ({
  id,
  title,
  defaultValue,
  handleChange,
  withLabel,
  autoComplete,
  invalid,
}) => {
  return (
    <div>
      {withLabel != false && <label className="text-sm font-medium text-gray-900" htmlFor={id}>{title}</label>}
      <input
        id={id}
        name={id}
        placeholder={withLabel == false ? title : ""}
        type={"email"}
        sizing="md"
        onChange={handleChange}
        value={defaultValue}
        className={`input-text ${
          invalid ? "focus:ring-red-600" : "focus:ring-primary"
        }`}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
};

export default FormEmailField;
