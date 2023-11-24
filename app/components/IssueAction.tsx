import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

const IssueAction = ({ href, children, className }: { href: string, children: ReactNode, className?: string}) => {
  return (
    <Button >
      <Link href={href} className={className}>{children}</Link>
    </Button>
  );
};

export default IssueAction;
