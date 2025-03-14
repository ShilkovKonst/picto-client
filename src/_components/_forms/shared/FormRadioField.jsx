const FormRadioField = ({ id, name, checked, handleChange, title }) => {
  return (
    <div className="flex items-center gap-3 m-1">
      <input
        type="radio"
        id={id}
        value={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="input-radio"
        required
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {title}
      </label>
    </div>
  );
};

export default FormRadioField;
