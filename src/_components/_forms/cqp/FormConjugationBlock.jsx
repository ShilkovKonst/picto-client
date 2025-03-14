import {
  conjugationNumbers,
  conjugationPersons,
  conjugationTenses,
} from "@/_constants/types";
import FormTextField from "../shared/FormTextField";

const FormConjugationBlock = ({ form, setForm }) => {
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
    <div className={`lg:flex lg:gap-3 lg:justify-between lg:mt-5`}>
      {conjugationTenses.map((t, i) => (
        <div key={i} className="flex flex-col gap-1">
          <label>{t == "PRESENT" ? "Présent" : "Futur"}</label>
          {conjugationNumbers.map((n, j) =>
            conjugationPersons.map((p, k) => (
              <FormTextField
                key={i * 100 + j * 10 + k}
                id={t + "_" + n + "_" + p}
                defaultValue={
                  form.irregular.conjugations[t + "_" + n + "_" + p] ?? ""
                }
                handleChange={handleConjugationChange}
                title={
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
                withLabel={false}
                additional={true}
              />
              // <TextInput
              //   key={j + k * 10}
              //   id={t + "_" + n + "_" + p}
              //   name={t + "_" + n + "_" + p}
              //   onChange={handleConjugationChange}
              //   value={form.irregular.conjugations[t + "_" + n + "_" + p] ?? ""}
              // placeholder={
              //   n == "SINGULIER" && p == "PREMIER"
              //     ? "Je / J'"
              //     : n == "SINGULIER" && p == "DEUXIEME"
              //     ? "Tu"
              //     : n == "SINGULIER" && p == "TROISIEME"
              //     ? "Il / Elle / On"
              //     : n == "PLURIEL" && p == "PREMIER"
              //     ? "Nous"
              //     : n == "PLURIEL" && p == "DEUXIEME"
              //     ? "Vous"
              //     : n == "PLURIEL" && p == "TROISIEME"
              //     ? "Ils / Elles"
              //     : ""
              //   }
              //   type="text"
              //   sizing="sm"
              //   required={isIrregular}
              // />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default FormConjugationBlock;
