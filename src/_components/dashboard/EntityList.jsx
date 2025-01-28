"use client";
import { useState, useEffect } from "react";
import Pagination from "@/_components/shared/Pagination";
import EntityTableItem from "@/_components/dashboard/EntityTableItem";
import EntityTableHeader from "@/_components/dashboard/EntityTableHeader";
import EntityListHeader from "@/_components/dashboard/EntityListHeader";
import {
  isAdmin,
  isNotInstitutionsOrUsersOrPatientsOrNotes,
  isSessionsInstitution,
  isSuperAdmin,
} from "@/_lib/checkConditions";

const EntityList = ({ data, session, entityName }) => {
  const accessCondition = (entity) =>
    isAdmin(session) && isSessionsInstitution(session, entityName, entity);
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
      <div className="table w-full min-h-96 *:*:*:border-gray-300">
        <EntityListHeader
          entityName={entityName}
          qnty={data?.page?.totalElements ?? 0}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <div className="flex flex-col gap-1">
          <EntityTableHeader entityName={entityName} session={session} />
          {data?.content &&
            data.content.map(
              (item, i) =>
                (isSuperAdmin(session) || accessCondition(item) || isNotInstitutionsOrUsersOrPatientsOrNotes(entityName)) && (
                  <EntityTableItem
                    key={i}
                    session={session}
                    entity={item}
                    entityName={entityName}
                    isSublist={false}
                  />
                )
            )}
        </div>
      </div>
      {data?.content?.length > 0 && (
        <Pagination data={data} entityName={entityName} />
      )}
    </>
  );
};

export default EntityList;
