import { Label, TextInput } from "flowbite-react";
import React from "react";

const FormConjFields = ({ form, isIrregular, handleChange }) => {
  const conjugations = [
    {
      present: [
        {
          firstSingular: form.irregular.conjugations[0].firstSingular,
        },
        {
          secondSingular: form.irregular.conjugations[0].secondSingular,
        },
        {
          thirdSingular: form.irregular.conjugations[0].thirdSingular,
        },
        {
          firstPlurial: form.irregular.conjugations[0].firstPlurial,
        },
        {
          secondPlurial: form.irregular.conjugations[0].secondPlurial,
        },
        {
          thirdPlurial: form.irregular.conjugations[0].thirdPlurial,
        },
      ],
    },
    {
      futur: [
        {
          firstSingular: form.irregular.conjugations[1].firstSingular,
        },
        {
          secondSingular: form.irregular.conjugations[1].secondSingular,
        },
        {
          thirdSingular: form.irregular.conjugations[1].thirdSingular,
        },
        {
          firstPlurial: form.irregular.conjugations[1].firstPlurial,
        },
        {
          secondPlurial: form.irregular.conjugations[1].secondPlurial,
        },
        {
          thirdPlurial: form.irregular.conjugations[1].thirdPlurial,
        },
      ],
    },
  ];
  console.log(form.irregular.conjugations[0])
  return (
    <div className={`lg:flex lg:justify-between`}>
      {conjugations.map((tense, i) => (
        <div key={i} className="mt-5 lg:w-2/5 flex flex-col gap-1">
          <Label
            value={`${
              Object.keys(tense)[0] == "present" ? "Présent" : "Futur"
            }`}
          />
          {tense[Object.keys(tense)[0]].map((item, j) => (
            <TextInput
              key={j}
              id={Object.keys(item)[0]}
              placeholder={
                Object.keys(item)[0] == ("firstSingular")
                  ? "Je / J'"
                  : Object.keys(item)[0] == "secondSingular"
                  ? "Tu"
                  : Object.keys(item)[0] == "thirdSingular"
                  ? "Il / Elle / On"
                  : Object.keys(item)[0] == "firstPlurial"
                  ? "Nous"
                  : Object.keys(item)[0] == "secondPlurial"
                  ? "Vous"
                  : Object.keys(item)[0] == "thirdPlurial"
                  ? "Ils / Elles"
                  : ""
              }
              type="text"
              sizing="sm"
              name={Object.keys(item)[0]}
              onChange={(e) => handleChange(e, Object.keys(tense)[0] == "present" ? "present" : "futur")}
              value={Object.keys(tense)[0] == "present" ? form.irregular.conjugations[0][Object.keys(item)[0]] : form.irregular.conjugations[1][Object.keys(item)[0]]}
              required={isIrregular}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormConjFields;
