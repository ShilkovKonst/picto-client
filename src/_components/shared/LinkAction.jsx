import Link from "next/link";

const LinkAction = ({
  isSublist,
  href,
  icon,
  title,
}) => {
  const layoutClasses =
    "flex flex-row justify-center items-center group";
  const appearenceClasses =
    "bg-primary hover:bg-secondary transition ease-in-out duration-300 rounded-3xl border-none";
  const conditionClasses = isSublist
    ? "w-6 h-6 md:w-8"
    : "w-6 h-6 md:w-8 md:h-8";

  return (
    <Link
      title={title}
      href={href}
      className={`${layoutClasses} ${appearenceClasses} ${conditionClasses}`}
    >
      {icon}
    </Link>
  );
};

export default LinkAction;
