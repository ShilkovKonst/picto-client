import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import FormCheckboxField from "../shared/FormCheckboxField";
import { useEffect } from "react";

const FormQuestionBlock = ({
  question,
  pictograms,
  form,
  setForm,
  handleChange,
}) => {
  useEffect(() => {
    setForm({
      ...form,
      pictograms: question?.pictograms?.map(p => p.id.toString()) ?? [],
    });
  }, []);

  return (
    <div className={`lg:flex lg:justify-between lg:gap-3`}>
      <div>
        <label>Pictograms:</label>
        {form?.pictograms ? (
          pictograms.length > 0 &&
          pictograms.map((p, i) => (
            <FormCheckboxField
              key={i}
              id={"p" + p.id}
              value={p.id}
              title={p.title}
              checked={
                form?.pictograms?.includes(p.id.toString()) ? true : false
              }
              handleChange={(e) =>
                handleCheckboxChange(e, "pictograms", add, remove)
              }
            />
          ))
        ) : (
          <LoadingSpinner text={"Loading pictograms..."} />
        )}
      </div>
    </div>
  );
};

export default FormQuestionBlock;
