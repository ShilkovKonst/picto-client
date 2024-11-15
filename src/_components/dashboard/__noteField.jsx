"use client";

const NoteField = ({ entity, isSublist }) => {
  console.log(entity)
  return (
    <>
      <div className="flex justify-center items-center md:justify-start w-full text-sm">
        <div className="py-[27px] me-2 h-0 w-1 bg-transparent group-hover/item:bg-pbg transition ease-in-out duration-300"></div>
        <p className="w-full text-center md:text-start">
          {isSublist &&
            (entity?.user
              ? entity?.user ?? "entity?.user"
              : entity?.patient
              ? entity?.patient ?? "entity?.patient"
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
        <div className="flex justify-center md:justify-start w-full text-sm">
          <p className="w-full text-center md:text-start">
            {entity?.patient?.firstName.slice(0, 1) +
              ". " +
              entity?.patient?.lastName}
          </p>
        </div>
      )}
      <div className="flex justify-center md:justify-start w-full text-sm">
        <p className="w-full text-center md:text-start">{entity?.estimation}</p>
      </div>
      <div className="flex justify-center md:justify-start w-full text-sm">
        <p className="w-full text-center md:text-start">
          {entity?.createdAt?.slice(0, 10)}
        </p>
      </div>
    </>
  );
};

export default NoteField;
