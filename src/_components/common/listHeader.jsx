"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CreateIcon from "../icons/createIcon";
import { Label, Radio, Select } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";

const ListHeader = ({
  entityName,
  list,
  setList,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePerPageChange = (e) => {
    const { value } = e.target;
    router.push(`/dashboard/${entityName}?page=${0}&size=${value}&type=${searchParams.get("type")}`);
  };

  const handleListChange = (e) => {
    const { value } = e.target;
    if (entityName == "categories") {
      switch (value) {
        case "all":
          router.push(`/dashboard/${entityName}?page=${0}&size=${searchParams.get("size")}&type=all`);
          break;
        case "super":
          router.push(`/dashboard/${entityName}?page=${0}&size=${searchParams.get("size")}&type=supercategories`);
          break;
        case "sub":
          router.push(`/dashboard/${entityName}?page=${0}&size=${searchParams.get("size")}&type=subcategories`);
          break;
      }
    }
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
      <tr>
        <th className="flex flex-row flex-wrap gap-1 items-center my-2">
          <Label htmlFor="itemsPerPage" value={`Par page`} />
          {itemsPerPage != 0 && (
            <Select
              id="itemsPerPage"
              onChange={handlePerPageChange}
              sizing="sm"
              defaultValue={searchParams.get("size")}
            >
              {[5, 6, 7, 8, 9, 10].map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
          )}
          {(entityName == "categories" || entityName == "pictograms") && (
            <>
              <Label className="ml-auto" htmlFor="list" value={`Afficher:`} />
              <Select
                id="list"
                onChange={(e) => handleListChange(e)}
                sizing="sm"
                defaultValue={itemsPerPage}
              >
                <option value={"all"}>tous</option>
                {entityName == "categories" && (
                  <>
                    <option value={"super"}>super-catégories</option>
                    <option value={"sub"}>sous-catégories</option>
                  </>
                )}
              </Select>
            </>
          )}
        </th>
      </tr>
      <tr className="border-b">
        <th className="text-lg flex justify-between items-center">
          <span className="w-20"></span>
          <span className=" mx-auto">
            {entityName == "pictograms"
              ? "PICTOGRAMMES"
              : entityName.toUpperCase()}
          </span>
          <Link
            className="relative bg-pbg hover:bg-pred transition ease-in-out duration-300 h-10 w-10 rounded-3xl px-2 font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1 group mx-5"
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
