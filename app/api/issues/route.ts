import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validationSchema";

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  if (!issues)
    return NextResponse.json(
      { error: "the data is not invalid" },
      { status: 400 }
    );
  return NextResponse.json(issues, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
