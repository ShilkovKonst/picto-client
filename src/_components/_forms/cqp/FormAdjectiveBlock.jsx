import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import { irregularId } from "@/_constants/types";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import FormTextField from "../shared/FormTextField";
import { useEffect, useState } from "react";
import { hRegex } from "@/_constants/regex";
import Separator from "@/_components/shared/Separator";

const FormAdjectiveBlock = ({
  form,
  setForm,
  tags,
  isIrregular,
  setIsIrregular,
  handleChange,
}) => {
  const [adjTagsPool, setAdjTagsPool] = useState(
    tags.filter((t) => ["AVANT", "APRES"].some((e) => e == t.title))
  );

  useEffect(() => {
    hRegex.test(form.title)
      ? setAdjTagsPool(
          tags.filter((t) =>
            ["AVANT", "APRES", "H_ASPIRE"].some((e) => e == t.title)
          )
        )
      : setAdjTagsPool(
          tags.filter((t) => ["AVANT", "APRES"].some((e) => e == t.title))
        );
  }, [form.title[0]]);

  return (
    <div className={`lg:flex lg:justify-between lg:gap-3 lg:mt-5`}>
      <div className="flex flex-col lg:mt-5">
        <label>{"Est-ce que l'adjectif:"}</label>
        <div>
          <Separator />
          {adjTagsPool.map((t, i) => (
            <>
              {t.title != "H_ASPIRE" && (
                <FormCheckboxField
                  key={i}
                  id={t.title}
                  value={t.id}
                  required={
                    !form.tags.some((t) =>
                      adjTagsPool
                        .filter((t) =>
                          ["AVANT", "APRES"].some((e) => e == t.title)
                        )
                        .some((e) => e.id.toString() == t)
                    )
                  }
                  title={
                    t.title == "AVANT"
                      ? "peut être positionné avant le nom?"
                      : "peut être positionné après le nom?"
                  }
                  checked={form?.tags?.includes(t.id?.toString()) ?? false}
                  handleChange={(e) =>
                    handleCheckboxChange(e, "tags", form, setForm)
                  }
                />
              )}
              {t.title == "H_ASPIRE" && (
                <>
                  <Separator key={i} />
                  <FormCheckboxField
                    key={i}
                    id={t.title}
                    value={t.id}
                    title={`commence par \"h aspiré\"?`}
                    checked={form?.tags?.includes(t.id?.toString()) ?? false}
                    handleChange={(e) =>
                      handleCheckboxChange(e, "tags", form, setForm)
                    }
                  />
                </>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="lg:mt-11">
        <Separator />
        <FormCheckboxField
          id={"irregulier"}
          value={irregularId(tags)}
          title={"est irregulier?"}
          checked={form?.tags?.includes(irregularId(tags)?.toString()) ?? false}
          handleChange={(e) => {
            setIsIrregular((prev) => !prev);
            return handleCheckboxChange(e, "tags", form, setForm);
          }}
        />
        {isIrregular && (
          <div className="flex flex-col gap-1 mt-2">
            <FormTextField
              id={"plurial"}
              defaultValue={form.irregular.plurial}
              title={"Pluriel"}
              withLabel={false}
              handleChange={handleChange}
            />
            <FormTextField
              id={"feminin"}
              defaultValue={form.irregular.feminin}
              title={"Feminin"}
              withLabel={false}
              handleChange={handleChange}
            />
            <FormTextField
              id={"femininPlurial"}
              defaultValue={form.irregular.femininPlurial}
              title={"Feminin Pluriel"}
              withLabel={false}
              handleChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAdjectiveBlock;
