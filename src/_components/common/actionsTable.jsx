"use client";
import Link from "next/link";
import React, { useState } from "react";
import UpdateIcon from "../icons/updateIcon";
import RemoveIcon from "../icons/removeIcon";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteOneById, updateOneById } from "@/_helpers/categoryApiHelper";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import ActionDelete from "./_actionDelete";

const ActionsTable = ({ entity, entityName, isSublist }) => {

  return (
    <>
      <div className="flex flex-row items-center justify-evenly gap-5">
        <Link
          href={`/dashboard/${entityName}/${entity.id}/update`}
          className={`relative bg-pbg hover:bg-pred transition ease-in-out duration-300 ${isSublist ? "h-5" : "h-10"} w-10 rounded-3xl font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center text-xs sm:text-sm my-1 group`}
        >
          <UpdateIcon isSublist={isSublist} />
          <div className="hidden group-hover:block absolute bottom-[100%] left-0 pb-1 rounded-lg cursor-default z-50">
            <p className="text-xs text-black">Modifier</p>
          </div>
        </Link>
        <ActionDelete entity={entity} entityName={entityName} isSublist={isSublist} type="table" />
      </div>
    </>
  );
};

export default ActionsTable;
