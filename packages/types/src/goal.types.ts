import * as z from 'zod';
import { task } from './task.types';

//type declaration and not inference from zod schema because it keeps showing ts circularity errors

type Goal = {
  id: string;
  title: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  tasks: z.infer<typeof task>[];
  roadmapId: string;
  subgoals: Goal[];
};

const goal: z.ZodSchema<Goal> = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "The title can't be empty"),
  parentId: z.string().cuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  tasks: z.array(task),
  roadmapId: z.string().cuid(),
  subgoals: z.lazy(() => z.array(goal)),
});

export { type Goal, goal };
