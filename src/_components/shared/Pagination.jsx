"use client";
import { useSearchParams } from "next/navigation";
import { BackwardIcon, ForwardIcon } from "@/_components/icons";
import PaginationButton from "./PaginationButton";

const Pagination = ({ data, entityName }) => {
  const searchParams = useSearchParams();
  return (
    <nav className=" pt-4">
      <ul className="flex flex-row items-center justify-center gap-3">
        <PaginationButton
          content={1}
          page={0}
          size={data.page.size}
          entityName={entityName}
          searchParams={searchParams}
          condition={data.page.number != 0}
        />
        <li className=" min-w-8 sm:min-w-10"></li>
        <PaginationButton
          content={<BackwardIcon />}
          page={data.page.number - 1}
          size={data.page.size}
          entityName={entityName}
          searchParams={searchParams}
          condition={data.page.number > 0}
        />
        <li className="cursor-default h-10 rounded-3xl px-2 my-3 font-bold text-sm tracking-[1.25px] text-primary bg-[#f9f9f9] border-none outline-none w-auto min-w-10 flex flex-row justify-center items-center">
          {data.page.number + 1}
        </li>
        <PaginationButton
          content={<ForwardIcon />}
          page={data.page.number + 1}
          size={data.page.size}
          entityName={entityName}
          searchParams={searchParams}
          condition={data.page.number < data.page.totalPages - 1}
        />
        <li className=" min-w-8 sm:min-w-10"></li>
        <PaginationButton
          content={data.page.totalPages}
          page={data.page.totalPages - 1}
          size={data.page.size}
          entityName={entityName}
          searchParams={searchParams}
          condition={data.page.number < data.page.totalPages - 1}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
