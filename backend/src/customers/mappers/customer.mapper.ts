import { Customer as PrismaCustomer } from 'src/common/database/generated/prisma/client';
import { Customer } from '../entities/customer.entity';

import { ICustomerResponseDto } from '../interfaces';

export class CustomerMapper {
  /**
   *  Transform what comes from Prisma (DB) to the Domain Entity
   */
  static toDomain(raw: PrismaCustomer): Customer {
    const user = new Customer(raw);

    return user;
  }

  /**
   * Transform the Entity into a response DTO (cleaning sensitive data)
   */
  static toResponse(customer: Customer): ICustomerResponseDto {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      isActive: customer.isActive,
      company: customer.company,
      phone: customer.phone,
    };
  }
}
