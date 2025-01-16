import Link from "next/link";

const SeanceAction = ({ href, icon, title }) => {
  const layoutClasses =
    "relative flex flex-row justify-center items-center group gap-3 z-10 h-10";
  const textClasses = "font-bold outline-none text-base lg:text-lg";
  const appearenceClasses =
    "text-white hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300 rounded-3xl border-none";

  return (
    <Link
      href={href}
      className={`${layoutClasses} ${textClasses} ${appearenceClasses}`}
    >
      <div className={`lg:absolute lg:left-5 flex flex-col justify-center items-center h-10`}>{icon}</div>
      <p className="hidden lg:block">{title}</p>
    </Link>
  );
};

export default SeanceAction;
