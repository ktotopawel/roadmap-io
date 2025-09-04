import * as z from 'zod';
import { TaskSchema } from './task.types';

//type declaration and not inference from zod schema because it keeps showing ts circularity errors

export type Goal = {
  id: string;
  title: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  tasks: z.infer<typeof TaskSchema>[];
  roadmapId: string;
  subgoals: Goal[];
};

export const GoalSchema: z.ZodSchema<Goal> = z.object({
  id: z.cuid(),
  title: z.string().min(1, "The title can't be empty"),
  parentId: z.cuid().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tasks: z.array(TaskSchema),
  roadmapId: z.cuid(),
  subgoals: z.lazy(() => z.array(GoalSchema)),
});
