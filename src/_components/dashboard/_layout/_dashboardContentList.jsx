"use client";
import { usePathname, useSearchParams } from "next/navigation";
import DashboardContentItem from "./__dashboardContentItem";
import { useEffect, useState } from "react";
import {
  CategoriesIcon,
  HomeIcon,
  InstitutionsIcon,
  NotesIcon,
  PatientsIcon,
  PictogramsIcon,
  QuestionsIcon,
  TagsIcon,
  UsersIcon,
} from "@/_components/icons";

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

  const items = [
    {
      title: "Profile",
      url: "/dashboard",
      icon: <HomeIcon pathname={pathname} />,
      for: "USER",
    },
    {
      title: "Institutions",
      url: `/dashboard/institutions?size=${perPage}`,
      icon: <InstitutionsIcon pathname={pathname} />,
      for: "SUPER",
    },
    {
      title: "Users",
      url: `/dashboard/users?size=${perPage}`,
      icon: <UsersIcon pathname={pathname} />,
      for: "ADMIN",
    },
    {
      title: "Patients",
      url: `/dashboard/patients?size=${perPage}`,
      icon: <PatientsIcon pathname={pathname} />,
      for: "ADMIN",
    },
    {
      title: "Notes",
      url: `/dashboard/notes?size=${perPage}`,
      icon: <NotesIcon pathname={pathname} />,
      for: "ADMIN",
    },
    {
      title: "Questions",
      url: `/dashboard/questions?size=${perPage}`,
      icon: <QuestionsIcon pathname={pathname} />,
      for: "USER",
    },
    {
      title: "Categories",
      url: `/dashboard/categories?size=${perPage}&type=${catType}`,
      icon: <CategoriesIcon pathname={pathname} />,
      for: "USER",
    },
    {
      title: "Pictograms",
      url: `/dashboard/pictograms?size=${perPage}&type=${pictoType}`,
      icon: <PictogramsIcon pathname={pathname} />,
      for: "USER",
    },
    {
      title: "Tags",
      url: `/dashboard/tags?size=${perPage}`,
      icon: <TagsIcon pathname={pathname} />,
      for: "ADMIN",
    },
  ];

  return (
    <ul className="flex flex-row justify-between items-center w-full md:w-auto md:block mb-3 md:mb-0 md:mr-3 p-4 bg-[#ffffff80] shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059] md:space-y-4 text-left text-gray-500">
      {session &&
        ((session.roles.includes("ROLE_SUPERADMIN") &&
          items
            .filter((i) => i.for.includes("SUPER"))
            .map((item, i) => (
              <DashboardContentItem key={i} item={item} pathname={pathname} />
            ))) ||
          (session.roles.includes("ROLE_ADMIN") &&
            items
              .filter((i) => i.for.includes("ADMIN"))
              .map((item, i) => (
                <DashboardContentItem key={i} item={item} pathname={pathname} />
              ))) ||
          (session.roles.includes("ROLE_USER") &&
            items
              .filter((i) => i.for.includes("USER"))
              .map((item, i) => (
                <DashboardContentItem key={i} item={item} pathname={pathname} />
              ))))
              }
    </ul>
  );
};

export default DashboardContentList;
