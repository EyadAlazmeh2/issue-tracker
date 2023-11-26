import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  color?: "red";
}

const IssueAction = ({ href, children, className, color }: Props) => {
  return (
    <Button color={color}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </Button>
  );
};

export default IssueAction;
