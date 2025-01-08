import Link from "next/link";

const DashboardContentItem = ({ item, pathname }) => {
  return (
    <li>
      <Link
        className={`group ${(pathname.split("/").length == 2 && item.title == "Profile") || pathname.includes(item.title.toLowerCase()) ? 'text-black font-medium' : 'hover:text-black' } transition duration-150 ease-in-out flex items-center space-x-3 rtl:space-x-reverse"`}
        href={item.url}
      >
        {item.icon}
        <span className="hidden md:block">{item.title}</span>
      </Link>
    </li>
  );
};

export default DashboardContentItem;
