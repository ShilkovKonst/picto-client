import { Spinner } from "flowbite-react";
import React from "react";

const LoadingSpinner = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Spinner className="" aria-label="Loading théraputes..." />
      <p className="pl-2">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
