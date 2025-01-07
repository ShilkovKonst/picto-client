import { Datepicker, Label } from "flowbite-react";
import LoadingSpinner from "@/_components/_shared/atoms/LoadingSpinner";

const FormDatepickerField = ({ id, title, defaultValue, handleDateChange }) => {
  return (
    <div>
      <Label htmlFor={id} value={title} />
      {defaultValue ? (
        <Datepicker
          name={id}
          id={id}
          value={defaultValue}
          onChange={handleDateChange}
          sizing={"sm"}
          language="fr-FR"
          className="focus:*:*:*:ring-primary focus:*:*:*:ring-1 focus:*:*:*:border-none *:*:*:cursor-pointer"
          required
        />
      ) : (
        <LoadingSpinner text={"Loading birth date..."} />
      )}
    </div>
  );
};

export default FormDatepickerField;
