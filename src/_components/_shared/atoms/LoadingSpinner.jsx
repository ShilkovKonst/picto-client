import { Spinner } from "flowbite-react";

const LoadingSpinner = ({ text, size, height }) => {
  return (
    <div
      className={`flex justify-center items-center w-full ${
        height ? "h-[" + height + "px] mb-5" : ""
      }`}
    >
      <Spinner size={size ?? "md"} aria-label={text} />
      <p className="pl-2">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
