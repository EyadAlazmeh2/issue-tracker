import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

const IssueAction = ({ href, children, className }: Props) => {
  return (
    <Button>
      <Link href={href} className={className}>
        {children}
      </Link>
    </Button>
  );
};

export default IssueAction;
