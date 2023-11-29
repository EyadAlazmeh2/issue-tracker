"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const searchParams = useSearchParams();
  return (
    <Select.Root
      onValueChange={(status) => {
        // let param=``;
        // if(Status !==" ") param+=status=${Status};
        // if(searchParams.get('orderBy')) param+=&orderBy=${searchParams.get('orderBy')!};
        // const query= param !==`` ??${param}:"";
        // route.push(/issues/list${query});
        const params = new URLSearchParams();
        if (status !== " ") params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? `?${params}` : "";
        router.push(`/issues/list` + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
