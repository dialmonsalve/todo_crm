import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerTranslationHandler } from './translation/customer-translation.handler';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationCustomerDto } from './dto/pagination-customer.dto';

import type { ICustomerRepository, ICustomerResponseDto } from './interfaces';
import type { ApiResponse } from '@cInterfaces/api-response.interface';
import type { PaginatedResult } from '@cPaginate/interface';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    protected readonly tr: CustomerTranslationHandler
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<ApiResponse> {
    const name = await this.customerRepository.create(createCustomerDto);
    return {
      message: this.tr.create(name),
      statusCode: 201,
      error: null,
    };
  }

  findAll(
    paginationDto: PaginationCustomerDto
  ): Promise<PaginatedResult<ICustomerResponseDto>> {
    return this.customerRepository.findAll(paginationDto);
  }

  async findOne(id: number): Promise<ICustomerResponseDto> {
    const customer = await this.customerRepository.findById(id);
    if (!customer)
      throw new NotFoundException([this.tr.general('database.NOT_FOUND')]);

    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<ApiResponse> {
    const name = await this.customerRepository.update(id, updateCustomerDto);

    return {
      message: this.tr.update(name),
      statusCode: 200,
      error: null,
    };
  }

  async toggleActive(id: number): Promise<ApiResponse> {
    const { name, isActive } = await this.customerRepository.toggleActive(id);

    return {
      message: this.tr.toggle(name, isActive),
      statusCode: 200,
      error: null,
    };
  }
}
