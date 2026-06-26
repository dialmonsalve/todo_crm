import { Customer as PrismaCustomer } from '@generated-prisma/client';

export class Customer implements PrismaCustomer {
  company!: string | null;
  createdAt!: Date;
  email!: string;
  id!: string;
  isActive!: boolean;
  name!: string;
  phone!: string | null;
  updatedAt!: Date;

  constructor(data: PrismaCustomer) {
    Object.assign(this, data);
  }
}
