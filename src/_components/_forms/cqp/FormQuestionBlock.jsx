import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import FormCheckboxField from "../shared/FormCheckboxField";
import { useEffect, useState } from "react";
import { handleCheckboxChange } from "@/_lib/handleCheckboxChange";
import FormQuestionBlockItem from "./FormQuestionBlockItem";
import Separator from "@/_components/shared/Separator";
import { tenses } from "@/_constants/questionsTenses";
import FormRadioField from "../shared/FormRadioField";

const FormQuestionBlock = ({ question, categories, form, setForm }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    setForm({
      ...form,
      tense: question?.tense ?? "",
      pictograms: question?.pictograms?.map((p) => p.id.toString()) ?? [],
    });
  }, []);

  useEffect(() => {
    setSelectedSubcategory(null);
  }, [selectedCategory]);

  return (
    <div>
      <div className={`flex flex-col lg:justify-between`}>
        <p>Choisir un temps de réponse:</p>
        {form?.tense &&
          tenses.map((tense, i) => (
            <FormRadioField
              key={i}
              id={tense}
              name={"tense"}
              title={tense}
              checked={tense == form.tense}
              handleChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          ))}
      </div>
      <div className={`flex flex-col lg:justify-between`}>
        <p>Ajouter des pictogrammes des catégories suivantes:</p>
        {form?.pictograms ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 *:flex *:flex-col *:justify-start *:items-start *:max-h-80 *:overflow-y-scroll *:border-y  *:border-gray-300">
            {categories.length > 0 && (
              <div className="pictogramList">
                {categories.map((category, i) => (
                  <FormQuestionBlockItem
                    key={i}
                    item={category}
                    state={selectedCategory}
                    setState={setSelectedCategory}
                  />
                ))}
              </div>
            )}
            {selectedCategory && (
              <div className="pictogramList">
                {selectedCategory?.subcategories?.length > 0 &&
                  selectedCategory?.subcategories?.map((subcat, i) => (
                    <FormQuestionBlockItem
                      key={i}
                      item={subcat}
                      state={selectedSubcategory}
                      setState={setSelectedSubcategory}
                    />
                  ))}
                {selectedCategory?.subcategories?.length > 0 && <Separator />}
                {selectedCategory?.pictograms?.length > 0 &&
                  selectedCategory?.pictograms?.map((pictogram, i) => (
                    <FormCheckboxField
                      key={i}
                      id={"p" + pictogram.id}
                      value={pictogram.id}
                      title={pictogram.title}
                      checked={
                        form?.pictograms?.includes(pictogram.id.toString())
                          ? true
                          : false
                      }
                      handleChange={(e) =>
                        handleCheckboxChange(e, "pictograms", form, setForm)
                      }
                    />
                  ))}
              </div>
            )}
            {selectedSubcategory && (
              <div className="pictogramList">
                {selectedSubcategory.pictograms?.length > 0 &&
                  selectedSubcategory.pictograms?.map((pictogram, i) => (
                    <FormCheckboxField
                      key={i}
                      id={"p" + pictogram.id}
                      value={pictogram.id}
                      title={pictogram.title}
                      checked={
                        form?.pictograms?.includes(pictogram.id.toString())
                          ? true
                          : false
                      }
                      handleChange={(e) =>
                        handleCheckboxChange(e, "pictograms", form, setForm)
                      }
                    />
                  ))}
              </div>
            )}
          </div>
        ) : (
          <LoadingSpinner text={"Loading pictograms..."} />
        )}
      </div>
    </div>
  );
};

export default FormQuestionBlock;
