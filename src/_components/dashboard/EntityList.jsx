"use client";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import EntityTableItem from "../_shared/EntityTableItem";
import EntityTableHeader from "../_shared/EntityTableHeader";
import EntityListHeader from "@/_components/_shared/molecules/EntityListHeader";

const EntityList = ({ data, session, entityName }) => {
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
      <table className="table w-full min-h-96 *:*:*:border-gray-300">
        <EntityListHeader
          entityName={entityName}
          qnty={data?.page?.totalElements ?? 0}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <tbody className="flex flex-col gap-1">
          <EntityTableHeader entityName={entityName} session={session} />
          {data?.content &&
            data.content.map((item, i) => (
              <EntityTableItem
                key={i}
                session={session}
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
