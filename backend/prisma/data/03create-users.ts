import { Helpers } from 'prisma/helpers';
import { type PrismaClient, Role } from '@generated-prisma/client';
import type { Prisma } from '@generated-prisma/client';

const password = '123456';

export async function createUsers(
  prisma: PrismaClient,
  adminId: string
) {
  console.log('🌱 Creating users');
  const users: Prisma.UserCreateInput[] = [
    {
      email: 'user1@gmail.one',
      password: Helpers.hash(password),
      username: 'user1',
      role: Role.MANAGER,
      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
      profile: {
        create: {
          name: 'Carlos',
          lastName: 'Gómez',
          phone: '111111111',
          address: 'Calle 1',
          avatar: 'avatar2.jpg',
        },
      },
    },
    {
      email: 'user2@gmail.one',
      password: Helpers.hash(password),
      username: 'user2',
      role: Role.MANAGER,
      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
      profile: {
        create: {
          name: 'María',
          lastName: 'López',
          phone: '222222222',
          address: 'Calle 2',
          avatar: 'avatar3.jpg',
        },
      },
    },
    {
      email: 'user3@gmail.one',
      password: Helpers.hash(password),
      username: 'user3',
      role: Role.MANAGER,
      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
      profile: {
        create: {
          name: 'Pedro',
          lastName: 'Martínez',
          phone: '333333333',
          address: 'Calle 3',
          avatar: 'avatar4.jpg',
        },
      },
    },
    {
      email: 'user4@gmail.one',
      password: Helpers.hash(password),
      username: 'user4',
      role: Role.EMPLOYEE,
      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
      profile: {
        create: {
          name: 'Ana',
          lastName: 'Ramírez',
          phone: '444444444',
          address: 'Calle 4',
          avatar: 'avatar5.jpg',
        },
      },
    },
    {
      email: 'user5@gmail.one',
      password: Helpers.hash(password),
      username: 'user5',
      role: Role.EMPLOYEE,
      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
      profile: {
        create: {
          name: 'Luis',
          lastName: 'Fernández',
          phone: '555555555',
          address: 'Calle 5',
          avatar: 'avatar6.jpg',
        },
      },
    },
    {
      email: 'user6@gmail.one',
      password: Helpers.hash(password),
      username: 'user6',
      role: Role.EMPLOYEE,
      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
      profile: {
        create: {
          name: 'Sofía',
          lastName: 'Torres',
          phone: '666666666',
          address: 'Calle 6',
          avatar: 'avatar7.jpg',
        },
      },
    },
  ];

  return await Promise.all(
    users.map((data) =>
      prisma.user.create({ data, include: { profile: true } })
    )
  );
}
