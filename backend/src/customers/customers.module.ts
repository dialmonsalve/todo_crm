import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerTranslationHandler } from './translation/customer-translation.handler';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerTranslationHandler,
    {
      useClass: CustomerRepository,
      provide: 'ICustomerRepository',
    },
  ],
})
export class CustomersModule {}
