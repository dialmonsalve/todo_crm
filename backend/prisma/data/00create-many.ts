import { type PrismaClient } from '@generated-prisma/client';
import {
  createAppSecurityConfig,
  createAdmin,
  createUsers,
  createCustomers,
  createProjects,
  createTasks,
  createProjectsAssignment,
} from './';

export async function createMany(prisma: PrismaClient) {
  await createAppSecurityConfig(prisma);
  const admin = await createAdmin(prisma);

  const adminId = admin.id;

  await createUsers(prisma, adminId);

  await createCustomers(prisma);

  await createProjects(prisma);

  await createProjectsAssignment(prisma);

  await createTasks(prisma);
}
