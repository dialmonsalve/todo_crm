import type { PaginatedResult } from '@cPaginate/interface';
import type { IProjectResponseDto } from './project-response.interface';
import type { PaginationProjectDto } from '../dto/pagination-project.dto';
import type { CreateProjectDto } from '../dto/create-project.dto';
import type { UpdateProjectDto } from '../dto/update-project.dto';

export interface ICustomerRepository {
  findAll(
    paginationDto: PaginationProjectDto
  ): Promise<PaginatedResult<IProjectResponseDto>>;

  findById(id: number): Promise<IProjectResponseDto | null>;

  findUniqueWithState(id: number): Promise<{ isActive: boolean } | null>;

  create(data: CreateProjectDto): Promise<string>;

  update(id: number, data: UpdateProjectDto): Promise<string>;

  toggleActive(
    id: number,
    isActive: boolean
  ): Promise<{ name: string; isActive: boolean }>;
}
