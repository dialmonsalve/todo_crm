import type { PaginatedResult } from '@cPaginate/interface';
import type { ICustomerResponseDto } from './customer-response.interface';
import type { PaginationCustomerDto } from '../dto/pagination-customer.dto';
import type { Prisma } from '@generated-prisma/client';

export interface ICustomerRepository {
  findAll(
    paginationDto: PaginationCustomerDto
  ): Promise<PaginatedResult<ICustomerResponseDto>>;

  findById(id: number): Promise<ICustomerResponseDto | null>;

  create(data: Prisma.CustomerCreateInput): Promise<string>;

  update(id: number, data: Prisma.CustomerUpdateInput): Promise<string>;

  toggleActive(id: number): Promise<{ name: string; isActive: boolean }>;
}
