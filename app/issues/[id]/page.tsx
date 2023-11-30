import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });
  if (!issue) notFound();

  return (
    <Grid gapY="5" gapX="5" columns={{ initial: "1", md: "5" }}>
      <Box className="max-w-full space-y-5 col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box className="flex flex-col max-w-full gap-3">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issue={issue} />
          <DeleteIssueButton issue={issue} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
