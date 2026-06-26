import {
  Project,
  Task,
  Customer,
} from 'src/common/database/generated/prisma/client';

export type ProjectWithRelations = Project & {
  tasks: Task;
  client: Customer;
};
