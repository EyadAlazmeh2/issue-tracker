import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const LoadingForm = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingForm;
