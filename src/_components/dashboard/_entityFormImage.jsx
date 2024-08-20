import { FileInput, Label } from "flowbite-react";
import { Engagement } from "next/font/google";
import React from "react";

const EntityFormImage = ({ entity, entityName, form, setForm, pathname }) => {
    
  const handleFileChange = (e) => {
    setForm({
      ...form,
      imageFile: e?.target?.files[0] ?? null,
    });
  };
  
  return (
    <div className={`mt-5 ${entityName == "pictograms" ? "lg:w-[50%]" : ""}`}>
      <Label
        htmlFor="imageName"
        value={
          pathname.includes("create")
            ? `Image`
            : `Image: ${entity?.media?.imageName}`
        }
      />
      <FileInput
        id="imageName"
        helperText="Inserer l'image de votre catégorie"
        name="imageName"
        onChange={handleFileChange}
        required={pathname.includes("create")}
      />
    </div>
  );
};

export default EntityFormImage;
