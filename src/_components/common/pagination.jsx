"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BackwardIcon, ForwardIcon } from "../icons";

const Pagination = ({ data, entityName }) => {
  const searchParams = useSearchParams();
  return (
    <nav className="md:absolute -bottom-20 right-0 left-0">
      <ul className="flex flex-row items-center justify-center gap-3">
        <li className=" min-w-8 sm:min-w-10 cursor-pointer">
          {data.page.number != 0 && (
            <Link
              href={`/dashboard/${entityName}?page=${0}&size=${
                data.page.size
              }&type=${searchParams.get("type")}`}
              className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center font-normal"
            >
              1
            </Link>
          )}
        </li>
        <li className=" min-w-8 sm:min-w-10"></li>
        <li className=" min-w-8 sm:min-w-10 cursor-pointer">
          {data.page.number > 0 && (
            <Link
              href={`/dashboard/${entityName}?page=${
                data.page.number - 1
              }&size=${data.page.size}&type=${searchParams.get("type")}`}
              className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center"
            >
              <BackwardIcon />
            </Link>
          )}
        </li>
        <li className="cursor-default h-10 rounded-3xl px-2 my-3 font-bold text-sm tracking-[1.25px] text-primary bg-[#f9f9f9] border-none outline-none w-auto min-w-10 flex flex-row justify-center items-center">
          {data.page.number + 1}
        </li>
        <li className="min-w-8 sm:min-w-10 cursor-pointer">
          {data.page.number < data.page.totalPages - 1 && (
            <Link
              href={`/dashboard/${entityName}?page=${
                data.page.number + 1
              }&size=${data.page.size}&type=${searchParams.get("type")}`}
              className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center"
            >
              <ForwardIcon />
            </Link>
          )}
        </li>
        <li className=" min-w-8 sm:min-w-10"></li>
        <li className=" min-w-8 sm:min-w-10 cursor-pointer">
          {data.page.number != data.page.totalPages - 1 && (
            <Link
              href={`/dashboard/${entityName}?page=${
                data.page.totalPages - 1
              }&size=${data.page.size}&type=${searchParams.get("type")}`}
              className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center font-normal"
            >
              {data.page.totalPages}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
