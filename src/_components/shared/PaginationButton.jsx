import Link from "next/link";

const PaginationButton = ({
  entityName,
  searchParams,
  content,
  page,
  size,
  condition,
}) => {
  return (
    <li className=" min-w-8 sm:min-w-10 cursor-pointer">
      {condition && (
        <Link
          href={`/dashboard/${entityName}?page=${page}&size=${size}&type=${searchParams.get(
            "type"
          )}`}
          className="flex flex-row justify-center items-center text-white bg-primary hover:bg-secondary transition ease-in-out duration-300 h-10 rounded-full px-2 my-3 font-bold text-sm tracking-[1.25px] w-auto min-w-5 sm:min-w-10"
        >
          {content}
        </Link>
      )}
    </li>
  );
};

export default PaginationButton;
