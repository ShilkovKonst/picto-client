"use client";
import React from "react";
import { usePathname } from "next/navigation";
import EntityForm from "./_entityForm";
import EntityHead from "../_entityHead";

const EntityUpdate = ({
  session,
  entity,
  entityName,
  institutions,
  users,
  roles,
  patients,
}) => {
  const pathname = usePathname();
  return (
    <>
      <table className="table w-full">
        <EntityHead session={session} entity={entity} entityName={entityName} />
      </table>
      <EntityForm
        entity={entity}
        entityName={entityName}
        pathname={pathname}
        institutions={institutions}
        users={users}
        roles={roles}
        patients={patients}
      />
    </>
  );
};

export default EntityUpdate;
