"use client";
import React from "react";
import { usePathname } from "next/navigation";
import EntityHead from "./_entityHead";
import EntityForm from "./_entityForm";

const EntityUpdate = ({ entity, entityName, categories, questions, tags }) => {
  const pathname = usePathname();
  return (
    <>
      <table className="table w-full">
        <EntityHead entity={entity} entityName={entityName} />
      </table>
      <EntityForm
        entity={entity}
        entityName={entityName}
        pathname={pathname}
        categories={categories}
        questions={questions}
        tags={tags}
      />
    </>
  );
};

export default EntityUpdate;
