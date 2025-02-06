const LayoutManagementItem = ({
  icon,
  textTooltip,
  bgColor
}) => {
  return (
    <button
      title={textTooltip}
      className={`text-white ${bgColor}  w-12 h-12 border rounded-full transition ease-in-out duration-300`}
    >
      <div className={`flex justify-center items-center`}>{icon}</div>
    </button>
  );
};

export default LayoutManagementItem;
