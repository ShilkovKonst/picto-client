const FormTextAreaField = ({
  id,
  title,
  defaultValue,
  handleChange,
  limit,
  length,
}) => {
  return (
    <div className="">
      <label htmlFor={id}>{title}</label>
      <textarea
        id={id}
        name={id}
        type={`text`}
        sizing="md"
        onChange={handleChange}
        value={defaultValue}
        rows={3}
        className="input-textarea focus:ring-primary"
        required
      />
      <p className="text-end font-light text-xs">
        {limit - length} / {limit}
      </p>
    </div>
  );
};

export default FormTextAreaField;
