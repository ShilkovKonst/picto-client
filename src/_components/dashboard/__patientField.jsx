"use client";

const PatientField = ({ entity }) => {
  return (
    <>
      <div className="flex justify-center md:justify-start w-full">
        <p className="w-full text-center md:text-start">
          {entity.sex}
        </p>
      </div>
      <div className="flex justify-center md:justify-start w-full">
        <p className="w-full text-center md:text-start">{entity?.grade}</p>
      </div>
    </>
  );
};

export default PatientField;
