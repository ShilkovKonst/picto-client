import React from "react";

const RemoveIcon = ({ isSublist }) => {
  return (
    <svg
      className={`${
        isSublist ? "w-5 h-5" : "w-5 h-5 md:w-6 md:h-6"
      }  text-[#f9f9f9]`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
      />
    </svg>
  );
};

export default RemoveIcon;
