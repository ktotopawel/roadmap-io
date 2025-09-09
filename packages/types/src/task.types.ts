import * as z from 'zod';

export const TaskSchema = z.object({
  id: z.cuid(),
  goalId: z.cuid(),
  title: z.string().min(1, "Title can't be empty"),
  status: z.string(),
  dueDate: z.coerce.date(),
});

export type Task = z.infer<typeof TaskSchema>;
