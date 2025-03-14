"use client";
import { useState } from "react";

const FormImageField = ({ entity, form, setForm, pathname }) => {
  const [fileName, setFileName] = useState(
    (pathname.includes("create") ? "Image" : "Nouvelle image") +
      " non sélectionnée"
  );

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    setFileName(file ? file.name : "Image non sélectionnée");
    setForm({
      ...form,
      imageFileReq: e?.target?.files[0] ?? null,
    });
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="imageName" className="text-sm font-medium text-gray-900">
        {pathname.includes("create")
          ? `Image:`
          : `Image actuelle: ${entity?.media?.imageName}`}
      </label>
      <input
        type="file"
        className="hidden"
        id="imageName"
        onChange={handleFileChange}
      />
      <label htmlFor="imageName" className="input-file cursor-pointer">
        {pathname.includes("create")
          ? `Choisir une image`
          : `Choisir une nouvelle image`}
      </label>
      <span className="text-sm font-medium text-gray-900 cursor-default">
        {fileName}
      </span>
    </div>
  );
};

export default FormImageField;
