import * as z from 'zod';

export const TaskSchema = z.object({
  id: z.cuid(),
  goalId: z.cuid(),
  title: z.string().min(1, "Title can't be empty"),
  status: z.string(),
  dueDate: z.coerce.date().nullable(),
  description: z.string().min(1).nullable(),
  done: z.boolean().default(false),
  complexity: z.int().max(5).min(1),
});

export type Task = z.infer<typeof TaskSchema>;
