"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { PatchIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, CalloutText, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof PatchIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(PatchIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  const Submit = handleSubmit(async (data) => {
    try {
      setSubmitted(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitted(false);
      router.push("/issues/new");
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </Callout.Root>
      )}
      <form className="space-y-3 max-w-xl" onSubmit={Submit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitted}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitted && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
