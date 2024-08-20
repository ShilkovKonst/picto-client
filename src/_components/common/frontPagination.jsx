import React from "react";

const FrontPagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage
}) => {

  return (
    <nav className="md:absolute -bottom-20 right-0 left-0">
      <ul className="flex flex-row items-center justify-center gap-3">
        <li className=" min-w-8 sm:min-w-10 cursor-pointer">
          {currentPage != 1 && (
            <div
              onClick={() => setCurrentPage(1)}
              className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center font-normal"
            >
              1
            </div>
          )}
        </li>
        <li className=" min-w-8 sm:min-w-10"></li>
        <li className=" min-w-8 sm:min-w-10 cursor-pointer">
          {currentPage > 1 && (
            <div
              onClick={() => setCurrentPage(prev => prev - 1)}
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
            </div>
          )}
        </li>
        <li className="cursor-default h-10 rounded-3xl px-2 my-3 font-bold text-sm tracking-[1.25px] text-pbg bg-[#f9f9f9] border-none outline-none w-auto min-w-10 flex flex-row justify-center items-center">
          {currentPage}
        </li>
        <li className="min-w-8 sm:min-w-10 cursor-pointer">
          {currentPage < Math.ceil(totalItems / itemsPerPage) && (
            <div
              onClick={() => setCurrentPage(prev => prev + 1)}
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
            </div>
          )}
        </li>
        <li className=" min-w-8 sm:min-w-10"></li>
        <li className=" min-w-8 sm:min-w-10 cursor-pointer">
          {currentPage < Math.ceil(totalItems / itemsPerPage) && (
            <div
              onClick={() => setCurrentPage(Math.ceil(totalItems / itemsPerPage))}
              className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center font-normal"
            >
              {Math.ceil(totalItems / itemsPerPage)}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default FrontPagination;
