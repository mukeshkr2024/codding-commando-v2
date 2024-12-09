import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./navLink";
import UserAvatar from "./user-avatar";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Our Courses",
    href: "/courses",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
];

export default function Navbar() {
  return (
    <nav className="lg::px-16 min-h-[10vh] w-full bg-dark-purple p-6 text-white md:px-16 xl:px-20">
      <div className="flex items-center justify-between px-2">
        {/* logo  */}
        <div>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="Coding Commando"
              height={150}
              width={180}
              className="w-[70%]"
            />
          </Link>
        </div>

        {/* navitems  */}
        <div className="hidden md:flex">
          <div className="flex md:space-x-1 lg:space-x-4 2xl:space-x-6">
            {navLinks.map((navItem) => (
              <NavLink
                key={navItem.href}
                href={navItem.href}
                title={navItem.title}
              />
            ))}
          </div>
        </div>

        <div>
          <UserAvatar navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
}
