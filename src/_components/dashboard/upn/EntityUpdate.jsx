"use client";
import { usePathname } from "next/navigation";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Form from "@/_components/_forms/upn/Form";

const EntityUpdate = ({
  session,
  entity,
  entityName,
  institutions,
  users,
  patients,
  patient,
}) => {
  const pathname = usePathname();
  return (
    <>
      <div className="table w-full">
        <EntityHeader
          session={session}
          entity={entity}
          entityName={entityName}
        />
      </div>
      <Form
        session={session}
        entity={entity}
        entityName={entityName}
        pathname={pathname}
        institutions={institutions}
        users={users}
        patients={patients}
        patient={patient}
      />
    </>
  );
};

export default EntityUpdate;
