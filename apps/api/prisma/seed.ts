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

  const numGoals = Math.floor(Math.random() * 4) + 1; // 1 to 4 sub-goals

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
    await createGoals(roadmap.id, topGoal.id, 2, 4); // Create a tree of depth 4 for each top-level goal
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
