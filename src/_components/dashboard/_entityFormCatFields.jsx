import { getAllAsList } from "@/_helpers/categoryApiHelper";
import { getAll } from "@/_helpers/questionApiHelper";
import { Label, Select, Checkbox } from "flowbite-react";
import React, { useState, useEffect } from "react";

const EntityFormCatFields = ({ category, form, setForm, handleChange }) => {
  const [questions, setQuestions] = useState(null);
  const [categories, setCategories] = useState(null);
  
  const getQuestions = async () => {
    const quests = await getAll();
    setQuestions(quests);
  };

  const getCategories = async () => {
    const cats = await getAllAsList();
    setCategories(cats);
  };

  useEffect(() => {
    setForm({
      ...form,
      questions: category?.questions ?? [],
      supercategory: category?.supercategory ?? -1,
    });
    getQuestions();
    getCategories();
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
      questions: form.questions.filter((q) => {
        q != questionId;
      }),
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
        {form.supercategory && categories && (
          <Select
            id="supercategory"
            name="supercategory"
            onChange={handleChange}
            defaultValue={form?.supercategory}
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
        )}
      </div>
      <div className="mt-5">
        <Label value={`Questions:`} />
        {questions &&
          questions.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <Checkbox
                id={q.id}
                value={q.id}
                checked={form?.questions?.includes(q.id)}
                onChange={(e) => handleCheckboxChange(e, q)}
              />
              <Label htmlFor={q.id}>{q.title}</Label>
            </div>
          ))}
      </div>
    </>
  );
};

export default EntityFormCatFields;
