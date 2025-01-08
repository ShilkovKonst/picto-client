import Link from "next/link";

const GuestModeButton = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="text-white hover:text-black w-full bg-primary hover:bg-secondary transition ease-in-out duration-300 font-medium rounded-lg text-sm my-5 px-5 py-2.5 text-center flex justify-center items-center"
    >
      {title}
    </Link>
  );
};

export default GuestModeButton;
