"use client";
import { SuccessIcon, WarningIcon } from "@/_components/icons";

const UserField = ({ entity }) => {
  return (
    <>
      <div className="flex justify-center md:justify-start items-center w-full">
        {entity?.active ? <SuccessIcon /> : <WarningIcon />}
      </div>
      <div className="flex justify-center md:justify-start items-center w-full">
        {entity?.verified ? <SuccessIcon /> : <WarningIcon />}
      </div>
    </>
  );
};

export default UserField;
