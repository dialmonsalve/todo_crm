import { Injectable } from '@nestjs/common';

import { CustomerMapper } from '../mappers/customer.mapper';
import { PrismaService } from '@cDatabase/prisma.service';
import { PaginationHelper } from '@cPaginate/pagination.helper';

import type { PaginationCustomerDto } from '../dto/pagination-customer.dto';
import type {
  ALLOWED_SORT_CUSTOMER_FIELDS,
  ICustomerRepository,
  ICustomerResponseDto,
} from '../interfaces';
import type { Prisma } from '@generated-prisma/client';
import type { PaginatedResult } from '@cPaginate/interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput): Promise<string> {
    const customer = await this.prisma.customer.create({
      data,
    });
    return customer.name;
  }

  async update(id: number, data: Prisma.CustomerUpdateInput): Promise<string> {
    const customer = await this.prisma.customer.update({
      where: { id },
      data,
    });

    return customer.name;
  }

  async toggleActive(id: number): Promise<{ name: string; isActive: boolean }> {
    const currentUser = await this.prisma.customer.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: {
        isActive: !currentUser?.isActive,
      },
      select: { isActive: true, name: true },
    });
    return {
      name: updatedCustomer.name,
      isActive: updatedCustomer.isActive,
    };
  }

  async findAll(
    paginationDto: PaginationCustomerDto
  ): Promise<PaginatedResult<ICustomerResponseDto>> {
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

    const [total, customers] = await Promise.all([
      this.prisma.customer.count({
        where,
      }),
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: this.buildOrderBy(sortBy, order),
      }),
    ]);

    const data = customers.map((customer) => {
      const domain = CustomerMapper.toDomain(customer);
      return CustomerMapper.toResponse(domain);
    });

    return PaginationHelper.createResponse(data, total, paginationDto);
  }

  async findById(id: number): Promise<ICustomerResponseDto | null> {
    const customer = await this.prisma.customer.findFirst({
      where: { id },
    });

    if (!customer) return null;

    const customerEntity = CustomerMapper.toDomain(customer);

    return CustomerMapper.toResponse(customerEntity);
  }

  private buildOrderBy(
    sortBy?: (typeof ALLOWED_SORT_CUSTOMER_FIELDS)[number],
    order: 'asc' | 'desc' = 'desc'
  ): Prisma.CustomerOrderByWithRelationInput[] {
    if (!sortBy) return [{ createdAt: 'desc' }];

    const orderMap: Record<string, Prisma.CustomerOrderByWithRelationInput> = {
      id: { id: order },
      email: { email: order },
      name: { name: order },
      company: { company: order },
    };

    return orderMap[sortBy] ? [orderMap[sortBy]] : [{ createdAt: 'desc' }];
  }

  private filter(
    isActive?: boolean,
    search?: string
  ): Prisma.CustomerWhereInput {
    return {
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { company: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };
  }
}
