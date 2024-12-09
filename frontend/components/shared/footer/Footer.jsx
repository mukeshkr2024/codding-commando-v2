"use client";

import { useEffect, useState } from "react";

// import { ErrorToast } from "@/components/error-toast";
import apiClient from "lib/api-client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const FollowLinks = [
  {
    icon: <FaInstagram aria-label="Twitter" className="text-lg sm:text-2xl" />,
    href: "https://www.instagram.com/coding.commando?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },

  {
    icon: <FaFacebook aria-label="Facebook" className="text-lg sm:text-2xl" />,
    href: "https://www.facebook.com/codingcomando",
  },
  {
    icon: <FaTwitter aria-label="Twitter" className="text-lg sm:text-2xl" />,
    href: "https://twitter.com/Coding_Commando",
  },
  {
    icon: (
      <FaLinkedinIn aria-label="Instagram" className="text-lg sm:text-2xl" />
    ),
    href: "https://www.linkedin.com/company/coding-commando/",
  },
];

const UseFullLinks = [
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Refund Policy",
    href: "/refund-policy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
  },
  {
    title: "Demo",
    href: "/demo",
  },
];

const Footer = () => {
  const [links, setLinks] = useState(null);
  const fetchLinks = async () => {
    try {
      const { data } = await apiClient.get("/links-courses");

      setLinks(data?.links);
    } catch (error) {
      // ErrorToast(error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6 bg-dark-purple p-8 lg:flex-row">
      <Link href="/" className="lg:mr-4">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width={200}
          height={200}
        />
      </Link>
      <div className="flex w-full justify-between">
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <FooterItem title="UseFull Links" items={UseFullLinks} />
          <div>
            <h4 className="pb-2  text-lg font-semibold text-[#EBEBEB] ">
              Follow Links
            </h4>
            <div className="flex w-full gap-2 ">
              {FollowLinks &&
                FollowLinks.map((link) => (
                  <a
                    href={link.href}
                    key={link.href}
                    target="_blank"
                    className="text-white"
                  >
                    {link.icon}
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          {/* <FooterItem title="Trending Courses" items={Courses} /> */}

          <div className="flex flex-col gap-1 lg:w-1/2">
            <h4 className="pb-2 text-lg font-semibold text-[#EBEBEB]">
              Trending Courses
            </h4>
            {links &&
              links?.map((item) => (
                <Link
                  href={`/courses/${item?._id}`}
                  key={item?._id}
                  className=" text-sm text-gray-600 sm:text-base"
                >
                  {item?.title}
                </Link>
              ))}
          </div>

          <div className="flex flex-col gap-1 lg:w-1/2">
            <h4 className="pb-2 text-lg font-semibold text-[#EBEBEB]">
              Contact us
            </h4>
            <p className="text-sm  text-gray-600 sm:text-base">
              Shivpuri Rd, South{" "}
            </p>
            <p className="text-sm  text-gray-600 sm:text-base">
              Shivpuri, Shivpuri, Rajbansi{" "}
            </p>
            <p className="text-sm  text-gray-600 sm:text-base">
              Nagar, Patna, Bihar 800029
            </p>
            <p className="font-Poppins  text-sm text-gray-600 sm:text-base">
              +91 8002732847
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterItem = ({ title, items }) => {
  return (
    <div className="flex flex-col gap-1 lg:w-1/2">
      <h4 className="pb-2  text-lg font-semibold text-[#EBEBEB] ">{title}</h4>
      {items &&
        items.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="text-sm  text-gray-600 sm:text-base"
          >
            {link.title}
          </Link>
        ))}
    </div>
  );
};

export default Footer;
