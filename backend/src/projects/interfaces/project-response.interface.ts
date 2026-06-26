import { Task } from '@common/database/generated/prisma/client';

export interface IProjectResponseDto {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  tasks: Task[];
}

type Customer = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
};

export const ALLOWED_SORT_PROJECT_FIELDS = ['id', 'name', 'customer'] as const;
