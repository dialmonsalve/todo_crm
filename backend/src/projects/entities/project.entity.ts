import { Type } from 'class-transformer';

import { Task } from '../../tasks/entities/task.entity';
import { Customer } from '../../customers/entities/customer.entity';

import type { Project as PrismaProject } from '@generated-prisma/client';
import type { ProjectWithRelations } from '../interfaces';

export class Project implements PrismaProject {
  id!: number;
  name!: string;
  clientId!: string;
  createdAt!: Date;
  description!: string | null;
  updatedAt!: Date;

  @Type(() => Customer)
  customer!: Customer;

  @Type(() => Task)
  tasks!: Task[];

  constructor(data: ProjectWithRelations) {
    Object.assign(this, data);
  }
}
