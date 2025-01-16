"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EntityListHeaderPerPageSelector from "../shared/EntityListHeaderPerPageSelector";
import EntityListHeaderTypeSelector from "../shared/EntityListHeaderTypeSelector";

const EntityListHeader = ({ entityName, qnty }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePerPageChange = (e) => {
    const { value } = e.target;
    localStorage.setItem("itemsPerPage", value);
    router.push(
      `/dashboard/${entityName}?page=${0}&size=${value}&type=${searchParams.get(
        "type"
      )}`
    );
  };

  const handleTypeListChange = (e) => {
    const { value } = e.target;
    if (entityName == "categories") {
      localStorage.setItem("catCurrentList", value);
    }
    if (entityName == "pictograms") {
      localStorage.setItem("pictoCurrentList", value);
    }
    router.push(
      `/dashboard/${entityName}?page=${0}&size=${searchParams.get(
        "size"
      )}&type=${value}`
    );
  };

  useEffect(() => {
    if (
      entityName == "categories" &&
      (localStorage.getItem("catCurrentList") == null ||
        localStorage.getItem("catCurrentList") == undefined)
    ) {
      localStorage.setItem("catCurrentList", "all");
    }
  }, []);

  return (
    <thead>
      <tr className="border-b grid grid-cols-8">
        <th className="col-span-2 flex flex-col lg:flex-row gap-1 lg:gap-2">
          <EntityListHeaderPerPageSelector
            id={"itemsPerPage"}
            title={"Par page"}
            value={"size"}
            handleChange={handlePerPageChange}
            searchParams={searchParams}
          />
          
        </th>
        <th className="col-span-4 text-lg flex justify-between items-center">
          <span className=" mx-auto">
            {entityName == "pictograms"
              ? "PICTOGRAMMES"
              : entityName.toUpperCase()}{" "}
            {"(" + qnty + ")"}
          </span>
        </th>
        <th className="col-span-2 text-lg flex justify-end items-center">
        {(entityName == "categories" || entityName == "pictograms") && (
            <EntityListHeaderTypeSelector
              entityName={entityName}
              id={"typeList"}
              title={"Afficher"}
              value={"type"}
              handleChange={handleTypeListChange}
              searchParams={searchParams}
            />
          )}
        </th>
      </tr>
    </thead>
  );
};

export default EntityListHeader;
