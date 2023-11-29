"use client";

import { Avatar, Box, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "./components";

const NavBar = () => {
  return (
    <nav className="flex space-x-6 mb-5 h-14 px-5 border-b items-center justify-between">
      <Flex align="center" gap="5">
        <Link href="/">
          <AiFillBug />
        </Link>
        <NavLinks />
      </Flex>
      <AuthStatus />
    </nav>
  );
};

const NavLinks = () => {
  const current = usePathname();

  const links = [
    { label: "Dashbored", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": current === link.href,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Login
      </Link>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              className="cursor-pointer"
              src={session?.user?.image!}
              size="2"
              radius="full"
              fallback="?"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session?.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"} className="cursor-pointer">
                Log out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
