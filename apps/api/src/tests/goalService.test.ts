/* eslint-disable @typescript-eslint/unbound-method */
import GoalService from '../services/goal.service';
import { prismaMock } from './__mocks__/prismaMock';

describe('GoalService', () => {
  let goalService: GoalService;

  beforeEach(() => {
    goalService = new GoalService(prismaMock);
  });

  describe('createGoal', () => {
    it('creates and returns a goal', async () => {
      const createdGoal = {
        id: 'g1',
        title: 'My Goal',
        parentId: null,
        roadmapId: 'r1',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'test',
        required: false,
      };

      prismaMock.goal.create.mockResolvedValue(createdGoal);

      const result = await goalService.createGoal('My Goal', 'r1', 'test', false);

      expect(prismaMock.goal.create).toHaveBeenCalledWith({
        data: {
          title: 'My Goal',
          parentId: null,
          roadmapId: 'r1',
          description: 'test',
          required: false,
        },
      });
      expect(result).toEqual(createdGoal);
    });
  });

  describe('getGoalByRoadmapId', () => {
    it('fetches goals with tasks for a given roadmap', async () => {
      const mockGoals = [
        {
          id: 'g1',
          title: 'Goal 1',
          parentId: null,
          roadmapId: 'r1',
          createdAt: new Date(),
          updatedAt: new Date(),
          tasks: [{ id: 't1', title: 'Task 1', status: 'TODO', goalId: 'g1' }],
          description: 'test',
          required: false,
        },
      ];

      prismaMock.goal.findMany.mockResolvedValue(mockGoals);

      const result = await goalService.getGoalByRoadmapId('r1');

      expect(prismaMock.goal.findMany).toHaveBeenCalledWith({
        where: { roadmapId: 'r1' },
        include: { tasks: true },
      });
      expect(result).toEqual(mockGoals);
    });
  });
});
