import Link from "next/link";
import React from "react";

const DashboardContentItem = ({ item, pathname }) => {

  return (
    <li>
      <Link
        className={`group ${pathname.includes(item.title.toLowerCase()) ? 'text-black font-medium' : 'hover:text-black' } transition duration-150 ease-in-out flex items-center space-x-3 rtl:space-x-reverse"`}
        href={item.url}
      >
        {item.icon}
        <span className="hidden md:block">{item.title}</span>
      </Link>
    </li>
  );
};

export default DashboardContentItem;
