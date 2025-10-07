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
  description: string;
};

export const GoalSchema: z.ZodType<Goal> = z.object({
  id: z.cuid(),
  title: z.string().min(1, "The title can't be empty"),
  parentId: z.cuid().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tasks: z.array(TaskSchema),
  roadmapId: z.cuid(),
  subgoals: z.lazy(() => z.array(GoalSchema)),
  description: z.string(),
});

export const CreateGoalPayload = z.object({
  title: z.string().min(1, "The title can't be empty"),
  roadmapId: z.cuid(),
  description: z.string(),
});

export type CreateGoalPayload = z.infer<typeof CreateGoalPayload>;
