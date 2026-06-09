import { type PrismaClient } from '@generated-prisma/client';

export async function createCustomers(prisma: PrismaClient) {
  console.log('🌱 Creating customer');
  await prisma.customer.createMany({
    data: [
      {
        email: 'customer1@customer.com',
        name: 'customer 1',
        company: 'company 1',
        phone: '111111111',
      },
      {
        email: 'customer2@customer.com',
        name: 'customer 2',
        company: 'company 2',
        phone: '222222222',
      },
      {
        email: 'customer3@customer.com',
        name: 'customer 3',
        company: 'company 3',
        phone: '333333333',
      },
      {
        email: 'customer4@customer.com',
        name: 'customer 4',
        company: 'company 4',
        phone: '444444444',
      },
      {
        email: 'customer5@customer.com',
        name: 'customer 5',
        company: 'company 5',
        phone: '555555555',
      },
      {
        email: 'customer6@customer.com',
        name: 'customer 6',
        company: 'company 6',
        phone: '666666666',
      },
    ],
  });

  console.log('✅ Customers created successfully');
}
