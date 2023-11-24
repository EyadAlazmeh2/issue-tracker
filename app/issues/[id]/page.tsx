import { IssueAction, IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });
  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Box className="space-y-5">
        <Heading>{issue?.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkDown>{issue?.description}</ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <IssueAction
          className="flex items-center"
          href={`/issues/${issue.id}/edit`}
        >
          <Pencil2Icon className="mr-2" />
          Edit Issue
        </IssueAction>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
