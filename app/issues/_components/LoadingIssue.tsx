import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";
import React from "react";

const LoadingIssue = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingIssue;
