import { type PrismaClient } from '@generated-prisma/client';

export async function deleteMany(prisma: PrismaClient) {
  console.log('🧹 Cleaning data base...');

  console.log('🧹 appSecurityConfig');
  await prisma.appSecurityConfig.deleteMany();

  console.log('🧹 customers');
  await prisma.customer.deleteMany();

  console.log('🧹 Projects');
  await prisma.project.deleteMany();

  console.log('🧹 projectsAssignment');
  await prisma.projectAssignment.deleteMany();

  console.log('🧹 Tasks');
  await prisma.task.deleteMany();

  console.log('🧹 Profiles');
  await prisma.profile.deleteMany();

  console.log('🧹 Users');
  await prisma.user.deleteMany();

  console.log('✅ Database is now clean');
}
