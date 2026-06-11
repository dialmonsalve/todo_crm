import { Injectable } from '@nestjs/common';

import type { CreateUserDto } from '../dto/create-user.dto';
import type { UpdateUserDto } from '../dto/update-user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '@cDatabase/prisma.service';
import { PaginationHelper } from '@cPaginate/pagination.helper';

import type { PaginationUserDto } from '../dto/pagination-user.dto';
import type {
  ALLOWED_SORT_USER_FIELDS,
  IUserRepository,
  IUserResponseDto,
} from '../interfaces';

import type { PaginatedResult } from '@cPaginate/interface';
import type { Prisma } from '@generated-prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto, createdById: string): Promise<string> {
    const { profile, password, ...userData } = data;

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        email: userData.email.toLocaleLowerCase(),
        password,
        role: data.role,
        createdBy: { connect: { id: createdById } },
        updatedBy: { connect: { id: createdById } },
        profile: {
          create: {
            ...profile,
            name: profile.name.toLocaleLowerCase(),
            lastName: profile.name.toLocaleLowerCase(),
          },
        },
      },
      include: { profile: true },
    });
    const name = `${user.profile?.name} ${user.profile?.lastName}`;
    return name;
  }

  async update(
    id: string,
    data: UpdateUserDto,
    updatedById: string
  ): Promise<string> {
    const { profile } = data;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedById,
        profile: {
          update: {
            ...profile,
            ...(profile !== undefined && {
              name: profile.name.toLocaleLowerCase(),
            }),
            ...(profile !== undefined && {
              lastName: profile.lastName.toLocaleLowerCase(),
            }),
          },
        },
      },
      include: { profile: true },
    });

    return `${user.profile?.name} ${user.profile?.lastName}`;
  }

  async toggleActive(
    id: string,
    updatedById: string
  ): Promise<{ name: string; isActive: boolean }> {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        isActive: !currentUser?.isActive,
        updatedById,
      },
      select: { isActive: true, profile: true },
    });
    return {
      name: `${updatedUser.profile?.name} ${updatedUser.profile?.lastName}`,
      isActive: updatedUser.isActive,
    };
  }

  async findById(id: string): Promise<IUserResponseDto | null> {
    return await this.find({ id });
  }

  async findByUsername(username: string): Promise<IUserResponseDto | null> {
    return await this.find({ username });
  }

  async findAll(
    paginationDto: PaginationUserDto
  ): Promise<PaginatedResult<IUserResponseDto>> {
    const {
      page = 1,
      limit = 10,
      order,
      sortBy,
      isActive,
      search,
    } = paginationDto;
    const skip = (page - 1) * limit;

    const where = this.filter(isActive, search?.trim());

    const [total, users] = await Promise.all([
      this.prisma.user.count({
        where,
      }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          profile: true,
        },
        orderBy: this.buildOrderBy(sortBy, order),
      }),
    ]);

    const data = users.map((user) => {
      const domain = UserMapper.toDomain(user);
      return UserMapper.toResponse(domain);
    });

    return PaginationHelper.createResponse(data, total, paginationDto);
  }

  private buildOrderBy(
    sortBy?: (typeof ALLOWED_SORT_USER_FIELDS)[number],
    order: 'asc' | 'desc' = 'desc'
  ): Prisma.UserOrderByWithRelationInput[] {
    if (!sortBy) return [{ createdAt: 'desc' }];

    const orderMap: Record<string, Prisma.UserOrderByWithRelationInput> = {
      id: { id: order },
      createdAt: { createdAt: order },
      email: { email: order },
      name: { profile: { name: order } },
      createdBy: { createdBy: { username: order } },
      updatedBy: { updatedBy: { username: order } },
      role: { role: order },
    };

    return orderMap[sortBy] ? [orderMap[sortBy]] : [{ createdAt: 'desc' }];
  }

  private async find(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        AND: [where, { username: { not: 'admin' } }],
      },
      include: {
        profile: true,
      },
    });

    if (!user) return null;

    const userEntity = UserMapper.toDomain(user);

    return UserMapper.toResponse(userEntity);
  }

  private filter(isActive?: boolean, search?: string): Prisma.UserWhereInput {
    return {
      username: { not: 'admin' },
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          {
            profile: {
              is: { name: { contains: search, mode: 'insensitive' } },
            },
          },
          {
            profile: {
              is: {
                lastName: { contains: search, mode: 'insensitive' },
              },
            },
          },
        ],
      }),
    };
  }
}
