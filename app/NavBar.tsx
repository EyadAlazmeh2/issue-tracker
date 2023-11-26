"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const current = usePathname();

  const links = [
    { label: "Dashbored", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 mb-5 h-14 px-5 border-b items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              "text-zinc-900": current === link.href,
              "text-zinc-500": current !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
