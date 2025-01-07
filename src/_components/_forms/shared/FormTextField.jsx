const FormTextField = ({
  id,
  title,
  defaultValue,
  handleChange,
  withLabel,
}) => {
  return (
    <div>
      {withLabel != false && (
        <label className="text-sm font-medium text-gray-900" htmlFor={id}>
          {title}
        </label>
      )}
      <input
        id={id}
        name={id}
        placeholder={withLabel == false ? title : ""}
        type={`text`}
        sizing="md"
        onChange={handleChange}
        value={defaultValue}
        className="input-text focus:ring-primary"
        required
      />
    </div>
  );
};

export default FormTextField;
