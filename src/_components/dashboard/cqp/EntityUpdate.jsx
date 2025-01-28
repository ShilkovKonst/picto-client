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
  pictograms,
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
        categories={categories}
        questions={questions}
        pictograms={pictograms}
        tags={tags}
      />
    </>
  );
};

export default EntityUpdate;
