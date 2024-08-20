import { Label, TextInput } from "flowbite-react";
import React from "react";

const FormConjFields = ({ form, isIrregular, handleChange }) => {
  const conjugations = [
    {
      present: [
        {
          present_first_person_singular: form.present_first_person_singular,
        },
        {
          present_second_person_singular: form.present_second_person_singular,
        },
        {
          present_third_person_singular: form.present_third_person_singular,
        },
        {
          present_first_person_plurial: form.present_first_person_plurial,
        },
        {
          present_second_person_plurial: form.present_second_person_plurial,
        },
        {
          present_third_person_plurial: form.present_third_person_plurial,
        },
      ],
    },
    {
      futur: [
        {
          futur_first_person_singular: form.futur_first_person_singular,
        },
        {
          futur_second_person_singular: form.futur_second_person_singular,
        },
        {
          futur_third_person_singular: form.futur_third_person_singular,
        },
        {
          futur_first_person_plurial: form.futur_first_person_plurial,
        },
        {
          futur_second_person_plurial: form.futur_second_person_plurial,
        },
        {
          futur_third_person_plurial: form.futur_third_person_plurial,
        },
      ],
    },
  ];

  return (
    <div className={`lg:flex lg:justify-between`}>
      {conjugations.map((tense, i) => (
        <fieldset key={i} className="mt-5 lg:w-2/5 flex flex-col gap-1">
          <Label
            value={`${
              Object.keys(tense)[0] == "present" ? "Présent" : "Futur"
            }`}
          />
          {tense[Object.keys(tense)[0]].map((item, j) => (
            <TextInput
              key={j}
              id={item.key}
              placeholder={
                Object.keys(item)[0].includes("first_person_singular")
                  ? "Je / J'"
                  : Object.keys(item)[0].includes("second_person_singular")
                  ? "Tu"
                  : Object.keys(item)[0].includes("third_person_singular")
                  ? "Il / Elle / On"
                  : Object.keys(item)[0].includes("first_person_plurial")
                  ? "Nous"
                  : Object.keys(item)[0].includes("second_person_plurial")
                  ? "Vous"
                  : Object.keys(item)[0].includes("third_person_plurial")
                  ? "Ils / Elles"
                  : ""
              }
              type="text"
              sizing="sm"
              name={Object.keys(item)[0]}
              onChange={handleChange}
              value={item.value}
              required={isIrregular}
            />
          ))}
        </fieldset>
      ))}
    </div>
  );
};

export default FormConjFields;
