import * as z from 'zod';
import { goal } from './goal.types';

export const roadmap = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "The title can't be empty"),
  createdAt: z.date(),
  updatedAt: z.date(),
  goals: z.array(goal),
});

export type Roadmap = z.infer<typeof roadmap>;

export const roadmapPayload = z.object({
  title: z.string().min(1, "The title can't be empty"),
});

export type RoadmapPayload = z.infer<typeof roadmapPayload>;
