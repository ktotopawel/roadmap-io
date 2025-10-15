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
  description: string | null;
  required: boolean;
  done: boolean;
  complexity: number;
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
  description: z.string().min(1, 'Description should have at least 1 character.').nullable(),
  required: z.boolean(),
  done: z.boolean().default(false),
  complexity: z.number().min(1).max(3),
});

export const CreateGoalPayload = z.object({
  title: z.string().min(1, "The title can't be empty"),
  roadmapId: z.cuid(),
  description: z.string().min(1).optional(),
  required: z.boolean(),
  complexity: z.number().min(1).max(5),
});

export type CreateGoalPayload = z.infer<typeof CreateGoalPayload>;
