"use client";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../icons";
import PasswordDesc from "./PasswordDesc";

const FormPasswordField = ({
  id,
  title,
  defaultValue,
  handleChange,
  withLabel,
  autoComplete,
  invalid,
  required,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div>
      {withLabel != false && <label htmlFor={id}>{title}</label>}
      <div className="relative">
        <input
          id={id}
          name={id}
          placeholder={withLabel == false ? title : ""}
          type={isRevealed ? "text" : "password"}
          sizing="md"
          onChange={handleChange}
          value={defaultValue}
          className={`peer input-text ${
            invalid ? "focus:ring-red-600" : "focus:ring-primary"
          }`}
          autoComplete={autoComplete}
          required={required ?? true}
        />
        {isRevealed ? (
          <EyeSlashIcon setIsRevealed={setIsRevealed} />
        ) : (
          <EyeIcon setIsRevealed={setIsRevealed} />
        )}
        <PasswordDesc defaultValue={defaultValue} invalid={invalid} />
      </div>
    </div>
  );
};

export default FormPasswordField;
