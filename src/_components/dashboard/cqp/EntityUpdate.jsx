"use client";
import { usePathname } from "next/navigation";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Form from "@/_components/_forms/cqp/Form";

const EntityUpdate = ({
  session,
  entity,
  entityName,
  categories,
  questions,
  tags,
}) => {
  const pathname = usePathname();
  return (
    <>
      <table className="table w-full">
        <EntityHeader
          session={session}
          entity={entity}
          entityName={entityName}
        />
      </table>
      <Form
        session={session}
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
