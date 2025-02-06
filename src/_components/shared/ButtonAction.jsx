const ButtonAction = ({
  isSublist,
  icon,
  title,
  handleClick,
}) => {
  const layoutClasses =
    "flex flex-row justify-center items-center group";
  const appearenceClasses =
    "bg-primary hover:bg-secondary transition ease-in-out duration-300 rounded-3xl border-none";
  const conditionClasses = isSublist
    ? "w-6 h-6 md:w-8"
    : "w-6 h-6 md:w-8 md:h-8";

  return (
    <button
      title={title}
      onClick={handleClick}
      className={`${layoutClasses} ${appearenceClasses} ${conditionClasses}`}
    >
      {icon}
    </button>
  );
};

export default ButtonAction;
