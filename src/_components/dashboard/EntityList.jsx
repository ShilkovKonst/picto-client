"use client";
import ListHeader from "@/_components/common/listHeader";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import FrontPagination from "@/_components/common/frontPagination";
import EntityItem from "./_entityItem";
import Pagination from "../common/pagination";

const EntityList = ({ data, entityName }) => {
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    if (
      localStorage.getItem("itemsPerPage") == null ||
      localStorage.getItem("itemsPerPage") == undefined ||
      localStorage.getItem("itemsPerPage") < 5
    ) {
      localStorage.setItem("itemsPerPage", 5);
    }
    setItemsPerPage(localStorage.getItem("itemsPerPage"));
  }, []);

  useEffect(() => {
    itemsPerPage != 0 && localStorage.setItem("itemsPerPage", itemsPerPage);
  }, [itemsPerPage]);

  return (
    <>
      <table className="table w-full min-h-96">
        <ListHeader
          entityName={entityName}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <tbody className="flex flex-col gap-1">
          <tr className="flex flex-row justify-between items-center text-sm sm:text-base py-4 border-b">
            <th
              className={`flex justify-center md:justify-start items-center md:text-start ${
                entityName == "categories" || entityName == "pictograms"
                  ? "w-1/3 md:w-2/5"
                  : "w-1/2"
              }`}
            >
              <Link
                href={`#`}
                className="flex items-center w-auto {{ sortBy == 'name' ? 'underline decoration-1' }} "
              >
                Titre
              </Link>
            </th>
            {(entityName == "categories" || entityName == "pictograms") && (
              <th className="text-center md:text-start w-1/3 md:w-1/5">
                Image
              </th>
            )}
            <th
              className={`text-center ${
                entityName == "categories" || entityName == "pictograms"
                  ? "w-1/3 md:w-2/5"
                  : "w-1/2"
              }`}
            >
              Actions
            </th>
          </tr>
          {data?.content &&
            data.content.map((item, i) => (
              <EntityItem
                key={i}
                entity={item}
                entityName={entityName}
                isSublist={false}
              />
            ))}
        </tbody>
      </table>
      {data?.content?.length > 0 && (
        <Pagination data={data} entityName={entityName} />
      )}
    </>
  );
};

export default EntityList;
