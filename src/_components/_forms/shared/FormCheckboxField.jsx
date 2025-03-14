const FormCheckboxField = ({
  id,
  value = id,
  checked,
  handleChange,
  required,
  title,
}) => {
  return (
    <div className="flex items-center gap-3 m-1">
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="input-checkbox"
        required={required ?? false}
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-900">{title}</label>
    </div>
  );
};

export default FormCheckboxField;
