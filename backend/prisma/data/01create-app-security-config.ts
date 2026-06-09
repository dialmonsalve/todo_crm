import { type PrismaClient } from '@generated-prisma/client';

export async function createAppSecurityConfig(prisma: PrismaClient) {
  console.log('🌱 Creating appSecurityConfig');
  await prisma.appSecurityConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, globalTokenVersion: 1 },
  });

  console.log('✅ appSecurityConfig created successfully');
}
