import Link from "next/link";

const DashboardContentItem = ({ title, url, icon, pathname }) => {
  return (
    <>
      <Link
        className={`group ${(pathname.split("/").length == 2 && title == "Profile") || pathname.includes(title.toLowerCase()) ? 'text-black font-medium' : 'hover:text-black' } transition duration-150 ease-in-out flex items-center space-x-3 rtl:space-x-reverse"`}
        href={url}
      >
        {icon}
        <span className="hidden md:block">{title}</span>
      </Link>
    </>
  );
};

export default DashboardContentItem;
