import {
  conjugationNumbers,
  conjugationPersons,
  conjugationTenses,
} from "@/_constants/types";
import { Label, TextInput } from "flowbite-react";

const FormConjugationBlock = ({ form, setForm, isIrregular }) => {
  const handleConjugationChange = (e) => {
    setForm({
      ...form,
      irregular: {
        ...form.irregular,
        conjugations: {
          ...form.irregular.conjugations,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <div className={`lg:flex lg:gap-3 lg:justify-between`}>
      {conjugationTenses.map((t, i) => (
        <div key={i} className="mt-5 flex flex-col gap-1">
          <Label value={t == "PRESENT" ? "Présent" : "Futur"} />
          {conjugationNumbers.map((n, j) =>
            conjugationPersons.map((p, k) => (
              <TextInput
                key={j+k*10}
                id={t + "_" + n + "_" + p}
                name={t + "_" + n + "_" + p}
                onChange={handleConjugationChange}
                value={form.irregular.conjugations[t + "_" + n + "_" + p] ?? ""}
                placeholder={
                  n == "SINGULIER" && p == "PREMIER"
                    ? "Je / J'"
                    : n == "SINGULIER" && p == "DEUXIEME"
                    ? "Tu"
                    : n == "SINGULIER" && p == "TROISIEME"
                    ? "Il / Elle / On"
                    : n == "PLURIEL" && p == "PREMIER"
                    ? "Nous"
                    : n == "PLURIEL" && p == "DEUXIEME"
                    ? "Vous"
                    : n == "PLURIEL" && p == "TROISIEME"
                    ? "Ils / Elles"
                    : ""
                }
                type="text"
                sizing="sm"
                required={isIrregular}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default FormConjugationBlock;
