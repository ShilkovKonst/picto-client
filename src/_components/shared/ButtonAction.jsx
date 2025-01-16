import ButtonTooltip from "./ButtonTooltip";

const ButtonAction = ({
  isSublist,
  icon,
  title,
  handleClick,
  position = "bottom" || "top" || "left" || "right",
  type = "alert" || "warning" || "info",
}) => {
  const layoutClasses =
    "relative flex flex-row justify-center items-center group";
  const textClasses =
    "font-bold tracking-[1.25px] outline-none text-xs sm:text-sm";
  const appearenceClasses =
    "bg-primary hover:bg-secondary transition ease-in-out duration-300 rounded-3xl border-none";
  const conditionClasses = isSublist ? "w-6 h-6 md:w-8" : "w-6 h-6 md:w-8 md:h-8";

  return (
    <button
      onClick={handleClick}
      className={`${layoutClasses} ${textClasses} ${appearenceClasses} ${conditionClasses}`}
    >
      {icon}
      <ButtonTooltip type={type} position={position} title={title} />
    </button>
  );
};

export default ButtonAction;
