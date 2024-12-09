import Link from "next/link";
import React from "react";

const FooterLinks = ({ title, href }) => {
  return (
    <Link href={href}>
      <p className="p-1 pl-2 text-base font-normal leading-5 text-gray-600">
        {title}
      </p>
    </Link>
  );
};

export default FooterLinks;
