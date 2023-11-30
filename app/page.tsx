import { Card, Flex, Grid, Table } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const progre = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid gap='5' columns={{ initial: '1', md: '2'}}>
      <Flex gap='5' direction='column'>
        <IssueSummary open={open} inProgress={progre} closed={closed} />
        <IssueChart open={open} inProgress={progre} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
