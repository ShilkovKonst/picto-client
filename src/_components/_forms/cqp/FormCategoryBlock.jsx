"use client";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import { useEffect } from "react";

const FormCategoryBlock = ({
  category,
  form,
  setForm,
  handleChange,
  categories,
}) => {
  useEffect(() => {
    setForm({
      ...form,
      supercategoryId: category?.supercategory?.id ?? -1,
    });
  }, []);

  return (
    <div className={`lg:flex lg:justify-between lg:gap-3 lg:mt-5`}>
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
  );
};

export default FormCategoryBlock;
