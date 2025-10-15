import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createGoals(
  roadmapId: string,
  parentId: string | null,
  level: number,
  maxLevel: number
): Promise<void> {
  if (level > maxLevel) {
    return;
  }

  const numGoals = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numGoals; i++) {
    const goal = await prisma.goal.create({
      data: {
        title: `Level ${String(level)} Goal ${String(i + 1)}`,
        description: `Description for level ${String(level)} goal ${String(i + 1)}`,
        roadmapId: roadmapId,
        parentId: parentId,
        required: Math.random() > 0.5,
        complexity: Math.floor(Math.random() * 5) + 1,
      },
    });
    console.log(`Created goal: ${goal.title}`);

    await createGoals(roadmapId, goal.id, level + 1, maxLevel);
  }
}

async function main(): Promise<void> {
  console.log(`Start seeding ...`);

  console.log('Cleaning up database...');
  await prisma.task.deleteMany({});
  await prisma.goal.deleteMany({});
  await prisma.roadmap.deleteMany({});
  await prisma.token.deleteMany({});
  await prisma.user.deleteMany({ where: { email: 'test@example.com' } });

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  console.log(`Created user with id: ${user.id}`);

  const roadmap = await prisma.roadmap.create({
    data: {
      title: 'Complex Goal Tree Roadmap',
      description: 'A sample roadmap with a complex, multi-level tree of goals for testing.',
      userId: user.id,
    },
  });
  console.log(`Created roadmap with id: ${roadmap.id}`);

  const numTopLevelGoals = 3;
  for (let i = 0; i < numTopLevelGoals; i++) {
    const topGoal = await prisma.goal.create({
      data: {
        title: `Top Level Goal ${String(i + 1)}`,
        description: `This is a major, high-level goal.`,
        roadmapId: roadmap.id,
        parentId: null,
        required: true,
        complexity: 5,
      },
    });
    console.log(`Created top-level goal: ${topGoal.title}`);
    await createGoals(roadmap.id, topGoal.id, 2, 4);
  }

  const feRoadmap = await prisma.roadmap.create({
    data: {
      title: 'Frontend Developer Roadmap',
      description: 'A roadmap for becoming a frontend developer.',
      userId: user.id,
    },
  });

  const htmlGoal = await prisma.goal.create({
    data: {
      title: 'Learn HTML',
      description: 'Learn the fundamentals of HTML.',
      roadmapId: feRoadmap.id,
      parentId: null,
      required: true,
      complexity: 1,
      done: true,
    },
  });

  const cssGoal = await prisma.goal.create({
    data: {
      title: 'Learn CSS',
      description: 'Learn the fundamentals of CSS.',
      roadmapId: feRoadmap.id,
      parentId: null,
      required: true,
      complexity: 2,
      done: false,
    },
  });

  const jsGoal = await prisma.goal.create({
    data: {
      title: 'Learn JavaScript',
      description: 'Learn the fundamentals of JavaScript.',
      roadmapId: feRoadmap.id,
      parentId: null,
      required: true,
      complexity: 4,
      done: false,
    },
  });

  const selectorsGoal = await prisma.goal.create({
    data: {
      title: 'Selectors',
      description: 'Learn how to use CSS selectors.',
      roadmapId: feRoadmap.id,
      parentId: cssGoal.id,
      required: true,
      complexity: 2,
      done: true,
    },
  });

  const boxModelGoal = await prisma.goal.create({
    data: {
      title: 'Box Model',
      description: 'Learn how to use the CSS box model.',
      roadmapId: feRoadmap.id,
      parentId: cssGoal.id,
      required: true,
      complexity: 2,
      done: true,
    },
  });

  const flexboxGoal = await prisma.goal.create({
    data: {
      title: 'Flexbox',
      description: 'Learn how to use Flexbox for layout.',
      roadmapId: feRoadmap.id,
      parentId: cssGoal.id,
      required: true,
      complexity: 3,
      done: true,
    },
  });

  const gridGoal = await prisma.goal.create({
    data: {
      title: 'Grid',
      description: 'Learn how to use CSS Grid for layout.',
      roadmapId: feRoadmap.id,
      parentId: cssGoal.id,
      required: true,
      complexity: 3,
      done: false,
    },
  });

  const syntaxGoal = await prisma.goal.create({
    data: {
      title: 'Syntax and Basic Constructs',
      description: 'Learn the basic syntax of JavaScript.',
      roadmapId: feRoadmap.id,
      parentId: jsGoal.id,
      required: true,
      complexity: 2,
      done: true,
    },
  });

  const domGoal = await prisma.goal.create({
    data: {
      title: 'DOM Manipulation',
      description: 'Learn how to manipulate the DOM with JavaScript.',
      roadmapId: feRoadmap.id,
      parentId: jsGoal.id,
      required: true,
      complexity: 3,
      done: true,
    },
  });

  const asyncGoal = await prisma.goal.create({
    data: {
      title: 'Asynchronous JavaScript',
      description: 'Learn how to work with asynchronous code in JavaScript.',
      roadmapId: feRoadmap.id,
      parentId: jsGoal.id,
      required: true,
      complexity: 4,
      done: false,
    },
  });

  const promisesGoal = await prisma.goal.create({
    data: {
      title: 'Promises',
      description: 'Learn how to use Promises for asynchronous operations.',
      roadmapId: feRoadmap.id,
      parentId: asyncGoal.id,
      required: true,
      complexity: 3,
      done: true,
    },
  });

  const asyncAwaitGoal = await prisma.goal.create({
    data: {
      title: 'Async/Await',
      description: 'Learn how to use async/await for asynchronous code.',
      roadmapId: feRoadmap.id,
      parentId: asyncGoal.id,
      required: true,
      complexity: 3,
      done: false,
    },
  });

  const allGoals = await prisma.goal.findMany({
    where: { roadmapId: feRoadmap.id },
    include: { subGoals: true },
  });

  const goalMap = new Map(allGoals.map((goal) => [goal.id, goal]));

  const updateDoneStatus = async (goalId: string): Promise<boolean> => {
    const goal = goalMap.get(goalId);
    if (!goal) {
      return false;
    }

    if (goal.subGoals.length === 0) {
      return goal.done;
    }

    let allChildrenDone = true;
    for (const child of goal.subGoals) {
      const childDone = await updateDoneStatus(child.id);
      if (!childDone) {
        allChildrenDone = false;
      }
    }

    if (allChildrenDone && !goal.done) {
      await prisma.goal.update({
        where: { id: goal.id },
        data: { done: true },
      });
      return true;
    }

    return goal.done;
  };

  for (const goal of allGoals) {
    if (!goal.parentId) {
      await updateDoneStatus(goal.id);
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
