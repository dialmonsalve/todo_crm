import type { PaginatedResult } from '@cPaginate/interface';
import type { IUserResponseDto } from './user-response-dto.interface';
import type { PaginationUserDto } from '../dto/pagination-user.dto';
import type { Prisma } from '@generated-prisma/client';

export interface IUserRepository {
  findAll(
    paginationDto: PaginationUserDto
  ): Promise<PaginatedResult<IUserResponseDto>>;
  findById(id: string): Promise<IUserResponseDto | null>;

  findByUsername(username: string): Promise<IUserResponseDto | null>;

  create(data: Prisma.UserCreateInput): Promise<string>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<string>;

  toggleActive(
    id: string,
    updatedById: string
  ): Promise<{ name: string; isActive: boolean }>;
}
