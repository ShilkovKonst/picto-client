"use client";
import { FaMars, FaVenus } from "react-icons/fa6";

const PatientField = ({ entity }) => {
  return (
    <>
      <div className="flex justify-center md:justify-start items-center w-full">
        {entity?.sex == "homme" && <FaMars className={"w-5 h-5 md:w-6 md:h-6"}  />}
        {entity?.sex == "femme" && <FaVenus className={"w-5 h-5 md:w-6 md:h-6"} />}
      </div>
      <div className="flex justify-center md:justify-start items-center w-full">
        <p className="w-full text-sm md:text-base text-center md:text-start">
          {entity?.grade}
        </p>
      </div>
    </>
  );
};

export default PatientField;
