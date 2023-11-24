import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });
  if (!issue) notFound();
  
  return (
    <div>
      <p>{issue?.id}</p>
      <p>{issue?.title}</p>
      <p>{issue?.status}</p>
      <p>{issue?.description}</p>
    </div>
  );
};

export default IssueDetailPage;
