import Link from "next/link";

const FooterLink = ({ href, title }) => {
  return (
    <Link
      className="pl-1 cursor-pointer underline text-sm leading-loose font-bold hover:text-secondary transition duration-150"
      href={href}
    >
      {title}
    </Link>
  );
};

export default FooterLink;
