"use client";
import ListHeader from "@/_components/common/listHeader";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import FrontPagination from "@/_components/common/frontPagination";
import EntityItem from "./_entityItem";

const EntityList = ({ data, entityName }) => {
  const [currentList, setCurrentList] = useState(
    data?.sort((a, b) => {
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    })
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (
      localStorage.getItem("itemsPerPage") == null ||
      localStorage.getItem("itemsPerPage") == undefined
    ) {
      localStorage.setItem("itemsPerPage", 5);
    }
    setItemsPerPage(localStorage.getItem("itemsPerPage"));
  }, []);

  useEffect(() => {
    if (itemsPerPage !== localStorage.getItem("itemsPerPage")) {
      setCurrentPage(1);
    }
    localStorage.setItem("itemsPerPage", itemsPerPage);
  }, [itemsPerPage]);

  return (
    <>
      <table className="table w-full min-h-96">
        <ListHeader
          entityName={entityName}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          list={data}
          setList={setCurrentList}
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
          {currentItems &&
            currentItems.map((item, i) => (
              <EntityItem key={i} entity={item} entityName={entityName} />
            ))}
        </tbody>
      </table>
      {data && (
        <FrontPagination
          itemsPerPage={itemsPerPage}
          totalItems={currentList.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default EntityList;
