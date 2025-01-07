export const customTooltipTheme = {
  target: "w-fit",
  animation: "transition-opacity",
  arrow: {
    base: "absolute h-2 w-2 rotate-45",
    style: {
      auto: "bg-slate-400",
    },
    placement: "-4px",
  },
  base: "absolute z-10 inline-block rounded-lg px-1 text-sm font-normal shadow-sm",
  hidden: "invisible opacity-0",
  style: {
    auto: "border border-slate-400 bg-slate-200 text-gray-700",
  },
  content: "relative z-20 bg-slate-200",
};
