import { envs } from '@config/envs';
import { Helpers } from '../helpers';

import { Role, type PrismaClient } from '@generated-prisma/client';

export async function createAdmin(prisma: PrismaClient) {
  console.log('🌱 Creating user admin');
  const password = envs.DB_PASSWORD;

  if (!password) throw new Error('Verify password in.env file');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@mi-negocio.com',
      password: Helpers.hash(password),
      username: 'admin',
      role: Role.SUPER_ADMIN,
      profile: {
        create: {
          name: 'admin',
          lastName: 'admin',
          phone: '123456789',
          address: 'Avenida falsa 123',
          avatar: 'avatar.jpg',
        },
      },
    },
  });
  console.log('✅ Admin user created successfully');

  return admin;
}
