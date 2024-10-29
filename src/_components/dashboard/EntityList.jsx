"use client";
import ListHeader from "@/_components/common/listHeader";
import { useState, useEffect } from "react";
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
    itemsPerPage >= 5 &&
      itemsPerPage <= 10 &&
      localStorage.setItem("itemsPerPage", Math.floor(itemsPerPage));
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
          <tr
            className={`grid justify-between items-center text-sm sm:text-base py-4 border-b ${
              entityName == "users" || entityName == "patients"
                ? "grid-cols-8"
                : entityName == "notes"
                ? "grid-cols-4"
                : entityName == "pictograms" || entityName == "categories"
                ? "grid-cols-3"
                : "grid-cols-2"
            }`}
          >
            <th
              className={`text-center md:text-start ${
                entityName == "users" || entityName == "patients"
                  ? "col-span-3"
                  : "col-span-1"
              }`}
            >
              {entityName != "notes" &&
              entityName != "users" &&
              entityName != "patients"
                ? "Titre"
                : entityName == "patients"
                ? "Patient"
                : "Thérapeute"}
            </th>
            {(entityName == "categories" || entityName == "pictograms") && (
              <th className="text-center md:text-start">Image</th>
            )}
            {entityName == "notes" && (
              <>
                <th className="text-center md:text-start">Patient(e)</th>
                <th className="text-center md:text-start">Estimation</th>
              </>
            )}
            {entityName == "users" && (
              <>
                <th className="text-center md:text-start">Actif</th>
                <th className="text-center md:text-start">Vérifié</th>
              </>
            )}
            {entityName == "patients" && (
              <>
                <th className="text-center md:text-start">Sexe</th>
                <th className="text-center md:text-start">Grade</th>
              </>
            )}
            <th
              className={`text-center ${
                entityName == "users" || entityName == "patients"
                  ? "col-span-3"
                  : "col-span-1"
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
