const ButtonTooltip = ({ position, title, type = "info" }) => {
  const tooltipContainerPosition = {
    bottom: "top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2",
    bottomRight: "top-[calc(100%+0.25rem)] left-1/4 -translate-x-1/4",
    bottomLeft: "top-[calc(100%+0.25rem)] left-3/4 -translate-x-3/4",
    top: "bottom-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2",
    topRight: "bottom-[calc(100%+0.25rem)] left-1/4 -translate-x-1/4",
    topLeft: "bottom-[calc(100%+0.25rem)] left-3/4 -translate-x-3/4",
    left: "right-[calc(100%+0.25rem)] top-1/2 -translate-y-1/2",
    right: "left-[calc(100%+0.25rem)] top-1/2 -translate-y-1/2",
  };
  const tooltipArrowPosition = {
    bottom: "bottom-[calc(100%-0.25rem)] left-1/2 -translate-x-1/2",
    bottomRight: "bottom-[calc(100%-0.25rem)] left-[calc(25%+0.25rem)] -translate-x-1/4",
    bottomLeft: "bottom-[calc(100%-0.25rem)] left-[calc(75%-0.25rem)] -translate-x-3/4",
    top: "top-[calc(100%-0.25rem)] left-1/2 -translate-x-1/2",
    topRight: "top-[calc(100%-0.25rem)] left-[calc(25%+0.25rem)] -translate-x-1/4",
    topLeft: "top-[calc(100%-0.25rem)] left-[calc(75%-0.25rem)] -translate-x-3/4",
    left: "left-[calc(100%-0.25rem)] top-1/2 -translate-y-1/2",
    right: "right-[calc(100%-0.25rem)] top-1/2 -translate-y-1/2",
  };

  const tooltipTextContainerType = {
    alert: "border-red-500 bg-red-300",
    warning: "border-yellow-400 bg-yellow-200",
    info: "border-slate-400 bg-slate-200",
  };
  const tooltipTextType = {
    alert: "bg-red-300",
    warning: "bg-yellow-200",
    info: "bg-slate-200",
  };
  const tooltipArrowType = {
    alert: "bg-red-500",
    warning: "bg-yellow-400",
    info: "bg-slate-400",
  };

  return (
    <div
      className={`${tooltipContainerPosition[position]} hidden group-hover:inline-block absolute z-10 w-auto`} //hidden
    >
      <div
        className={`${tooltipTextContainerType[type]} relative rounded-full border cursor-default px-1`}
      >
        <p
          className={`${tooltipTextType[type]} text-xs text-black font-normal whitespace-nowrap z-10`}
        >
          {title}
        </p>
        <div
          className={`${tooltipArrowPosition[position]} ${tooltipArrowType[type]} -z-10 absolute h-2 w-2 rotate-45 `}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default ButtonTooltip;
