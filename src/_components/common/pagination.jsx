"use client";
import Link from "next/link";
import React from "react";

const Pagination = ({ data, entityName }) => {
  // console.log(data)
  return (
    <div className=" md:absolute bottom-3 right-0 left-0 flex flex-row items-center justify-center gap-3">
      <div className=" min-w-5 sm:min-w-10">
        {!data.first && (
          <Link
            href={`/dashboard/${entityName}?page=${0}&size=${data.size}`}
            className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center font-normal"
          >
            1
          </Link>
        )}
      </div>

      <div className=" min-w-5 sm:min-w-10"></div>

      <div className=" min-w-5 sm:min-w-10">
        {data.number > 0 && (
          <Link
            href={`/dashboard/${entityName}?page=${data.number - 1}&size=${
              data.size
            }`}
            className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#f9f9f9]"
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
                d="m14 8-4 4 4 4"
              />
            </svg>
          </Link>
        )}
      </div>

      <p className="h-10 rounded-3xl px-2 my-3 font-bold text-sm tracking-[1.25px] text-pbg bg-[#f9f9f9] border-none outline-none w-auto min-w-10 flex flex-row justify-center items-center">
        {data.number + 1}
      </p>

      <div className=" min-w-5 sm:min-w-10">
        {data.number < data.totalPages - 1 && (
          <Link
            href={`/dashboard/${entityName}?page=${data.number + 1}&size=${
              data.size
            }`}
            className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#f9f9f9]"
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
                d="m10 16 4-4-4-4"
              />
            </svg>
          </Link>
        )}
      </div>

      <div className=" min-w-5 sm:min-w-10"></div>

      <div className=" min-w-5 sm:min-w-10">
        {!data.last && (
          <Link
            href={`/dashboard/${entityName}?page=${data.totalPages - 1}&size=${
              data.size
            }`}
            className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center font-normal"
          >
            {data.totalPages}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
