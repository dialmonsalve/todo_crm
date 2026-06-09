import { type PrismaClient } from '@generated-prisma/client';

export async function createProjectsAssignment(prisma: PrismaClient) {
  console.log('🌱 Creating projects Assignment');

  const projects = await prisma.project.findMany();
  const users = await prisma.user.findMany();

  if (projects.length === 0 || users.length === 0) {
    throw new Error('⚠️ Projects or Users missing. Skip assignments.');
  }

  for (let i = 0; i < Math.min(projects.length, 4); i++) {
    await prisma.projectAssignment.create({
      data: {
        assignedAt: new Date(),
        project: {
          connect: { id: projects[i].id },
        },
        user: {
          connect: { id: users[0].id },
        },
      },
    });
  }

  console.log('✅ projects Assignment created successfully');
}
