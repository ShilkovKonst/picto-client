"use client";

const NoteField = ({ entity }) => {
  return (
    <>
      <div className="flex justify-center md:justify-start w-full">
        <p className="w-full text-center md:text-start">
          {entity.patient.firstName.slice(0, 1) +
            ". " +
            entity.patient.lastName}
        </p>
      </div>
      <div className="flex justify-center md:justify-start w-full">
        <p className="w-full text-center md:text-start">{entity?.estimation}</p>
      </div>
    </>
  );
};

export default NoteField;
