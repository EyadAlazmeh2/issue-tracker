import { IssueAction } from "@/app/components";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueDetail from "./IssueDetail";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });
  if (!issue) notFound();

  return (
    <Grid gapY="5" gapX="9" columns={{ initial: "1", md: "3" }}>
      <Box className="max-w-full space-y-5 col-span-2">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box className="flex flex-col w-36 gap-3">
          <AssigneeSelect issue={issue} />
          <IssueAction
            className="flex items-center"
            href={`/issues/edit/${issue.id}`}
          >
            <Pencil2Icon className="mr-2" />
            Edit Issue
          </IssueAction>
          <DeleteIssueButton issue={issue} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
