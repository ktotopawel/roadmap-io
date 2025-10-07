import * as z from 'zod';
import { GoalSchema } from './goal.types';

export const RoadmapSchema = z.object({
  id: z.cuid(),
  title: z.string().min(1, "The title can't be empty"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  goals: z.array(GoalSchema),
  description: z.string().min(1).nullable(),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

export const roadmapPayload = z.object({
  title: z.string().min(1, "The title can't be empty"),
  userId: z.cuid(),
  description: z.string().min(1, 'Description should have at least 1 chracter').optional(),
});

export type RoadmapPayload = z.infer<typeof roadmapPayload>;

export const getRoadmapsPayload = z.object({
  userId: z.cuid(),
});

export type GetRoadmapsPayload = z.infer<typeof getRoadmapsPayload>;
