import * as z from 'zod';

export const taskStatus = z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED']);

export type TaskStatus = z.infer<typeof taskStatus>;

export const TaskSchema = z.object({
  id: z.string().cuid(),
  goalId: z.string().cuid(),
  title: z.string().min(1, "Title can't be empty"),
  status: taskStatus,
});

export type Task = z.infer<typeof TaskSchema>;
