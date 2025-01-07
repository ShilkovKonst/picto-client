import Link from "next/link";

const FooterLink = ({ href, title }) => {
  return (
    <Link className="hover:text-secondary underline transition duration-150" href={href}>
      {title}
    </Link>
  );
};

export default FooterLink;
