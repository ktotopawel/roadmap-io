import * as z from 'zod';
import { GoalSchema } from './goal.types';

export const RoadmapSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "The title can't be empty"),
  createdAt: z.date(),
  updatedAt: z.date(),
  goals: z.array(GoalSchema),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

export const roadmapPayload = z.object({
  title: z.string().min(1, "The title can't be empty"),
});

export type RoadmapPayload = z.infer<typeof roadmapPayload>;
