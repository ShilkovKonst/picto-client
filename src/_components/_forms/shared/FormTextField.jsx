const FormTextField = ({
  id,
  title,
  defaultValue,
  handleChange,
  withLabel,
  additional,
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
        size={additional ? "sm" : "md"}
        onChange={handleChange}
        value={defaultValue}
        className={`${additional ? "text-xs" : "text-sm"} input-text focus:ring-primary`}
        required
      />
    </div>
  );
};

export default FormTextField;
