import { RemoveIcon, UpdateIcon } from "@/_components/icons";
import Link from "next/link";

const UserActions = ({ path1, path2 }) => {
  return (
    <div className="flex ml-3 flex-row items-center justify-evenly md:justify-end gap-3">
      <Link
        href={path1}
        className="group relative bg-pbg hover:bg-pred transition ease-in-out duration-300 h-10 w-10 rounded-3xl px-2 font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1 group"
      >
        <UpdateIcon />
        <div className="hidden group-hover:block absolute bottom-[100%] -right-[25%] rounded-lg p-0 cursor-default">
          <p className="text-xs text-black">Modifier</p>
        </div>
      </Link>
      <Link
        href={path2}
        className="group relative bg-pbg hover:bg-pred transition ease-in-out duration-300 h-10 w-10 rounded-3xl px-2 font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1 group"
      >
        <RemoveIcon />
        <div className="hidden group-hover:block absolute bottom-[100%] -right-[25%] rounded-lg p-0 cursor-default">
          <p className="text-xs text-black">Désactiver</p>
        </div>
      </Link>
    </div>
  );
};

export default UserActions;
