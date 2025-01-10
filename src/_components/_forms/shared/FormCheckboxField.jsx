const FormCheckboxField = ({
  id,
  value = id,
  checked,
  handleChange,
  title,
}) => {
  return (
    <div className="flex items-center gap-3 my-1">
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="input-checkbox"
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-900">{title}</label>
    </div>
  );
};

export default FormCheckboxField;