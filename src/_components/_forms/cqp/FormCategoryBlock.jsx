import FormCheckboxField from "@/_components/_forms/shared/FormCheckboxField";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import { Label } from "flowbite-react";
import { useEffect } from "react";

const FormCategoryBlock = ({
  category,
  form,
  setForm,
  handleChange,
  questions,
  categories,
}) => {
  useEffect(() => {
    setForm({
      ...form,
      questions: category?.questions ?? [],
      supercategoryId: category?.supercategory?.id ?? -1,
    });
  }, []);

  const addQuestion = (questionId) => {
    setForm({
      ...form,
      questions: [...form.questions, questionId],
    });
  };
  const removeQuestion = (questionId) => {
    setForm({
      ...form,
      questions: form.questions.filter((q) => q != questionId),
    });
  };
  const handleCheckboxChange = (e, question) => {
    if (e.target.checked) {
      addQuestion(question.id);
    } else {
      removeQuestion(question.id);
    }
  };

  return (
    <>
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        {form.supercategoryId && categories && (
          <FormSelectListField
            id={"supercategoryId"}
            title={"Super-catégorie:"}
            defaultValue={form.supercategoryId}
            handleChange={handleChange}
            zeroListElement={"Sans super-catégorie"}
            list={categories.filter((e) => e.id != category?.id)}
          />
        )}
      </div>
      <div className={`lg:flex lg:justify-between lg:gap-3`}>
        <div>
          <Label value={`Questions:`} />
          {form?.questions ? (
            questions.length > 0 &&
            questions.map((q, i) => (
              <FormCheckboxField
                key={i}
                id={q.id}
                value={q.id}
                title={q.title}
                checked={form?.questions?.includes(q.id) ? true : false}
                handleChange={(e) => handleCheckboxChange(e, q)}
              />
            ))
          ) : (
            <LoadingSpinner text={"Loading questions..."} />
          )}
        </div>
      </div>
    </>
  );
};

export default FormCategoryBlock;
