import { Label, Select, Checkbox, Spinner } from "flowbite-react";
import { useEffect } from "react";

const EntityFormCatFields = ({
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
      supercategory: category?.supercategory ?? -1,
    });
  }, []);
  console.log(form.questions);
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
      <div className="mt-5">
        <Label htmlFor="supercategory" value={`Super-catégorie:`} />
        {form.supercategory ? (
          categories && (
            <Select
              id="supercategory"
              name="supercategory"
              onChange={handleChange}
              defaultValue={form?.supercategory ?? -1}
              required
            >
              <option value={-1}>Sans super-catégorie</option>
              {categories &&
                categories?.map(
                  (cat, i) =>
                    cat.id != category?.id &&
                    !cat.supercategory && (
                      <option key={i} value={cat.id}>
                        {cat.title}
                      </option>
                    )
                )}
            </Select>
          )
        ) : (
          <div className="flex justify-center items-center w-full">
            <Spinner className="" aria-label="Loading categories..." />
            <p className="pl-2">Loading categories...</p>
          </div>
        )}
      </div>
      <div className="mt-5">
        <Label value={`Questions:`} />
        {form?.questions ? (
          questions.length > 0 &&
          questions.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <Checkbox
                id={q.id}
                value={q?.id}
                checked={form?.questions?.includes(q.id) ? true : false}
                onChange={(e) => handleCheckboxChange(e, q)}
              />
              <Label htmlFor={q.id}>{q.title}</Label>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Spinner className="" aria-label="Loading questions..." />
            <p className="pl-2">Loading questions...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EntityFormCatFields;
