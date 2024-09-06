"use client";
import { usePathname } from "next/navigation";
import React from "react";
import DashboardContentItem from "./__dashboardContentItem";
import HomeIcon from "../../icons/homeIcon";
import PatientsIcon from "../../icons/patientsIcon";
import QuestionsIcon from "../../icons/questionsIcon";
import CategoriesIcon from "../../icons/categoriesIcon";
import TagsIcon from "../../icons/tagsIcon";
import PictogramsIcon from "../../icons/pictogramsIcon";

const DashboardContentList = () => {
  const pathname = usePathname();
  const items = [
    {
      title: "Profile",
      url: "/dashboard",
      icon: <HomeIcon pathname={pathname} />,
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: <PatientsIcon pathname={pathname} />,
    },
    {
      title: "Questions",
      url: "/dashboard/questions",
      icon: <QuestionsIcon pathname={pathname} />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <CategoriesIcon pathname={pathname} />,
    },
    {
      title: "Pictograms",
      url: "/dashboard/pictograms",
      icon: <PictogramsIcon pathname={pathname} />,
    },
    {
      title: "Tags",
      url: "/dashboard/tags",
      icon: <TagsIcon pathname={pathname} />,
    },
  ];

  return (
    <ul className="flex flex-row justify-between items-center w-full md:w-auto md:block mb-3 md:mb-0 md:mr-3 p-4 bg-[#ffffff80] shadow-inset-5/5 rounded-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059] md:space-y-4 text-left text-gray-500">
      {items.map((item, i) => (
        <DashboardContentItem key={i} item={item} pathname={pathname} />
      ))}
    </ul>
  );
};

export default DashboardContentList;
