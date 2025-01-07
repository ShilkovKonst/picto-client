import { Label, TextInput } from "flowbite-react";

const FormConjugationBlock = ({ form, isIrregular, handleChange }) => {
  const conjugations = [
    {
      tense: "present",
      conjugation: [
        {
          name: "firstSingular",
          value: form.irregular.conjugations[0].firstSingular,
        },
        {
          name: "secondSingular",
          value: form.irregular.conjugations[0].secondSingular,
        },
        {
          name: "thirdSingular",
          value: form.irregular.conjugations[0].thirdSingular,
        },
        {
          name: "firstPlurial",
          value: form.irregular.conjugations[0].firstPlurial,
        },
        {
          name: "secondPlurial",
          value: form.irregular.conjugations[0].secondPlurial,
        },
        {
          name: "thirdPlurial",
          value: form.irregular.conjugations[0].thirdPlurial,
        },
      ],
    },
    {
      tense: "futur",
      conjugation: [
        {
          name: "firstSingular",
          value: form.irregular.conjugations[1].firstSingular,
        },
        {
          name: "secondSingular",
          value: form.irregular.conjugations[1].secondSingular,
        },
        {
          name: "thirdSingular",
          value: form.irregular.conjugations[1].thirdSingular,
        },
        {
          name: "firstPlurial",
          value: form.irregular.conjugations[1].firstPlurial,
        },
        {
          name: "secondPlurial",
          value: form.irregular.conjugations[1].secondPlurial,
        },
        {
          name: "thirdPlurial",
          value: form.irregular.conjugations[1].thirdPlurial,
        },
      ],
    },
  ];
  
  return (
    <div className={`lg:flex lg:justify-between`}>
      {conjugations.map((tense, i) => (
        <div key={i} className="mt-5 lg:w-2/5 flex flex-col gap-1">
          <Label value={tense.tense == "present" ? "Présent" : "Futur"} />
          {tense.conjugation.map((item, j) => (
            <TextInput
              key={j}
              id={item.name}
              name={item.name}
              onChange={(e) =>
                handleChange(e, tense.tense == "present" ? "present" : "futur")
              }
              value={
                tense.tense == "present"
                  ? form.irregular.conjugations[0][item.name]
                  : form.irregular.conjugations[1][item.name]
              }
              placeholder={
                item.name == "firstSingular"
                  ? "Je / J'"
                  : item.name == "secondSingular"
                  ? "Tu"
                  : item.name == "thirdSingular"
                  ? "Il / Elle / On"
                  : item.name == "firstPlurial"
                  ? "Nous"
                  : item.name == "secondPlurial"
                  ? "Vous"
                  : item.name == "thirdPlurial"
                  ? "Ils / Elles"
                  : ""
              }
              type="text"
              sizing="sm"
              required={isIrregular}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormConjugationBlock;
