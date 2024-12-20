"use client";
import { usePathname, useSearchParams } from "next/navigation";
import DashboardContentItem from "./__dashboardContentItem";
import { useEffect, useState } from "react";
import {
  adminRoleList,
  superAdminRoleList,
  userRolelist,
} from "@/_constants/contentLists";

const DashboardContentList = ({ session }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [perPage, setPerPage] = useState(5);
  const [catType, setCatType] = useState("all");
  const [pictoType, setPictoType] = useState("all");

  useEffect(() => {
    const itemsPerPage = localStorage.getItem("itemsPerPage");
    if (itemsPerPage) {
      setPerPage(itemsPerPage);
    }
    const catCurrentList = localStorage.getItem("catCurrentList");
    if (catCurrentList) {
      setCatType(catCurrentList);
    }
    const pictoCurrentList = localStorage.getItem("pictoCurrentList");
    if (pictoCurrentList) {
      setPictoType(pictoCurrentList);
    }
  }, [searchParams]);

  return (
    <ul className="flex flex-row justify-between items-center w-full md:w-auto md:block mb-3 md:mb-0 md:mr-3 p-4 bg-[#ffffff80] shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059] md:space-y-4 text-left text-gray-500">
      {session &&
        session.roles.includes("ROLE_USER") &&
        userRolelist(pathname, perPage, catType, pictoType).map((item, i) => (
          <DashboardContentItem key={i} item={item} pathname={pathname} />
        ))}
      {session &&
        session.roles.includes("ROLE_SUPERADMIN") &&
        superAdminRoleList(pathname, perPage).map((item, i) => (
          <DashboardContentItem key={i} item={item} pathname={pathname} />
        ))}
      {session &&
        session.roles.includes("ROLE_ADMIN") &&
        adminRoleList(pathname, perPage).map((item, i) => (
          <DashboardContentItem key={i} item={item} pathname={pathname} />
        ))}
    </ul>
  );
};

export default DashboardContentList;
