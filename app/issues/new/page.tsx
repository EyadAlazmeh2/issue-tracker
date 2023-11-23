"use client";

import { Button, Callout, CalloutText, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from 'zod'
import { useState } from "react";
import { creatIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueForm = z.infer<typeof creatIssueSchema>;

const NewIssuePage = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(creatIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </Callout.Root>
      )}
      <form
        className="space-y-3 max-w-xl"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            router.push("/issues/new");
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text> }
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
            )}
            />
            {errors.description && <Text color="red" as="p">{errors.description.message}</Text> }
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
