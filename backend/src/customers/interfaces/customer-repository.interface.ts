import type { PaginatedResult } from '@cPaginate/interface';
import type { ICustomerResponseDto } from './customer-response.interface';
import type { PaginationCustomerDto } from '../dto/pagination-customer.dto';
import type { CreateCustomerDto } from '../dto/create-customer.dto';
import type { UpdateCustomerDto } from '../dto/update-customer.dto';

export interface ICustomerRepository {
  findAll(
    paginationDto: PaginationCustomerDto
  ): Promise<PaginatedResult<ICustomerResponseDto>>;

  findById(id: number): Promise<ICustomerResponseDto | null>;

  create(data: CreateCustomerDto): Promise<string>;

  update(id: number, data: UpdateCustomerDto): Promise<string>;

  toggleActive(id: number): Promise<{ name: string; isActive: boolean }>;
}
