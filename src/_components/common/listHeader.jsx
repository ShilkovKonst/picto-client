"use client";
import Link from "next/link";
import { useEffect } from "react";
import CreateIcon from "../icons/createIcon";
import { useRouter, useSearchParams } from "next/navigation";
import ListPerPageSelector from "./_listPerPageSelector";
import ListTypeSelector from "./_listTypeSelector";

const ListHeader = ({ entityName, qnty }) => {
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
        <th className="col-span-2 lg:col-span-3 flex flex-col lg:flex-row gap-1 lg:gap-2">
          <ListPerPageSelector
            id={"itemsPerPage"}
            title={"Par page"}
            value={"size"}
            handleChange={handlePerPageChange}
            searchParams={searchParams}
          />
          {(entityName == "categories" || entityName == "pictograms") && (
            <ListTypeSelector
              entityName={entityName}
              id={"typeList"}
              title={"Afficher"}
              value={"type"}
              handleChange={handleTypeListChange}
              searchParams={searchParams}
            />
          )}
        </th>
        <th className="col-span-4 lg:col-span-3 text-lg flex justify-between items-center">
          <span className=" mx-auto">
            {entityName == "pictograms"
              ? "PICTOGRAMMES"
              : entityName.toUpperCase()}{" "}
            {"(" + qnty + ")"}
          </span>
        </th>
        <th className="col-span-2 text-lg flex justify-end items-center">
          <Link
            className="relative bg-primary hover:bg-secondary transition ease-in-out duration-300 h-8 w-8 rounded-3xl font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-2 group mx-5 lg:mx-2"
            href={`/dashboard/${entityName}/create`}
          >
            <CreateIcon />
            <div className="hidden group-hover:block absolute bottom-[100%] left-0 rounded-lg cursor-default w-auto">
              <p className="text-xs text-black">Créer</p>
            </div>
          </Link>
        </th>
      </tr>
    </thead>
  );
};

export default ListHeader;
