/* eslint-disable @typescript-eslint/unbound-method */
import RoadmapService from '../services/roadmap.service';
import { prismaMock } from './__mocks__/prismaMock';
import type { Goal } from '@roadmap-io/types';
import type GoalService from '../services/goal.service';

describe('RoadmapService', () => {
  let roadmapService: RoadmapService;
  let goalsServiceMock: { getGoalByRoadmapId: jest.Mock };

  beforeEach(() => {
    goalsServiceMock = {
      getGoalByRoadmapId: jest.fn(),
    };

    roadmapService = new RoadmapService(prismaMock, goalsServiceMock as unknown as GoalService);
  });

  describe('createRoadmap', () => {
    it('creates a roadmap and returns it', async () => {
      const roadmap = {
        id: '1',
        title: 'My Roadmap',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.roadmap.create.mockResolvedValue(roadmap);

      const result = await roadmapService.createRoadmap('My Roadmap', 'user1');

      expect(prismaMock.roadmap.create).toHaveBeenCalledWith({
        data: { title: 'My Roadmap', userId: 'user1' },
      });
      expect(result).toEqual(roadmap);
    });
  });

  describe('getRoadmaps', () => {
    it('fetches roadmaps and attaches goals', async () => {
      const roadmaps = [
        {
          id: 'r1',
          userId: 'user1',
          title: 'R1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.roadmap.findMany.mockResolvedValue(roadmaps);

      const mockGoals: Omit<Goal, 'subgoals'>[] = [
        {
          id: 'g1',
          parentId: null,
          title: 'Goal 1',
          roadmapId: 'r1',
          tasks: [
            {
              id: 't1',
              title: 'Task 1',
              status: 'TODO',
              goalId: 'g1',
              dueDate: new Date(Date.now() + 100 * 60 * 60 * 24 * 7),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      goalsServiceMock.getGoalByRoadmapId.mockResolvedValue(mockGoals);

      const result = await roadmapService.getRoadmaps('user1');

      expect(prismaMock.roadmap.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      expect(goalsServiceMock.getGoalByRoadmapId).toHaveBeenCalledWith('r1');

      expect(result).toEqual([
        {
          ...roadmaps[0],
          goals: [
            {
              ...mockGoals[0],
              tasks: [{ ...mockGoals[0].tasks[0], status: 'TODO' }],
              subgoals: [],
            },
          ],
        },
      ]);
    });
  });
});
