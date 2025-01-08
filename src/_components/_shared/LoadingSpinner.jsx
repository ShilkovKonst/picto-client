import { Spinner } from "flowbite-react";

const LoadingSpinner = ({ text, size }) => {
  return (
    <div
      className={`flex justify-center items-center w-full`}
    >
      <Spinner size={size ?? "md"} aria-label={text} />
      <p className="pl-2">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
