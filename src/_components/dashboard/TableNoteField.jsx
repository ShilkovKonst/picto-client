"use client";

const NoteField = ({ entity, isSublist }) => {
  return (
    <>
      <div
        className={`flex justify-center items-center w-full text-sm ${
          isSublist ? "before:py-[24px]" : "before:py-[27px] md:justify-start"
        } before:me-1 before:h-0 before:w-1 before:bg-transparent group-hover/item:before:bg-primary`}
      >
        <p className="w-full text-center md:text-start">
          {isSublist &&
            (entity?.user
              ? entity?.user.id ? entity.user.name : entity.user
              : entity?.patient
              ? entity?.patient.id ? entity.patient.name : entity.patient
              : "none")}
          {!isSublist &&
            (entity?.user && entity?.user?.firstName && entity?.user?.lastName
              ? entity?.user?.firstName?.slice(0, 1) +
                ". " +
                entity?.user?.lastName
              : entity?.user ?? "none")}
        </p>
      </div>
      {!isSublist && (
        <div className="flex justify-center md:justify-start items-center w-full text-sm">
          <p className="w-full text-center md:text-start ms-1">
            {entity?.patient?.firstName.slice(0, 1) +
              ". " +
              entity?.patient?.lastName}
          </p>
        </div>
      )}
      <div className={"flex justify-center md:justify-start items-center w-full text-sm"}>
        <p className={`w-full text-center  ms-1 ${!isSublist && "md:text-start"}`}>{entity?.estimation}</p>
      </div>
      {isSublist && (
        <div className="flex justify-center items-center w-full text-sm">
          <p className="w-full text-center">
            {entity?.createdAt?.slice(0, 10)}
          </p>
        </div>
      )}
    </>
  );
};

export default NoteField;
