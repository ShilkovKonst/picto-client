import { Spinner } from "flowbite-react";

const ButtonSpinner = ({ text }) => {
  return (
    <>
      <Spinner className="" size="md" aria-label={text} />
      <span className="pl-3">{text}</span>
    </>
  );
};

export default ButtonSpinner;
