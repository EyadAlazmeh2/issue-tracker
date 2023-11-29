import { Issue } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issue: Issue;
}

const EditIssueButton = ({ issue }: Props) => {
  return (
    <Button>
      <Link href={`/issues/edit/${issue.id}`} className="flex items-center">
        <Pencil2Icon className="mr-3" />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
