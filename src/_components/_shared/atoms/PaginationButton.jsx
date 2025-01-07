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
          className="btn-a w-auto min-w-5 sm:min-w-10 flex flex-row justify-center items-center"
        >
          {content}
        </Link>
      )}
    </li>
  );
};

export default PaginationButton;
