import type { CreateUserDto } from '../dto/create-user.dto';
import type { UpdateUserDto } from '../dto/update-user.dto';
import type { PaginatedResult } from '@cPaginate/interface';
import type { IUserResponseDto } from './user-response.interface';
import type { PaginationUserDto } from '../dto/pagination-user.dto';

export interface IUserRepository {
  findAll(
    paginationDto: PaginationUserDto
  ): Promise<PaginatedResult<IUserResponseDto>>;
  findById(id: string): Promise<IUserResponseDto | null>;

  findByUsername(username: string): Promise<IUserResponseDto | null>;

  create(data: CreateUserDto, createdById: string): Promise<string>;
  update(
    id: string,
    data: UpdateUserDto,
    updatedById: string
  ): Promise<string>;

  toggleActive(
    id: string,
    updatedById: string
  ): Promise<{ name: string; isActive: boolean }>;
}
