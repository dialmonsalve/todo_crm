import type {
  Priority,
  Task as PrismaTask,
  TaskStatus,
} from '@generated-prisma/client';

export class Task implements PrismaTask {
  assigneeId!: string;
  completedAt!: Date | null;
  createdAt!: Date;
  createdById!: string;
  description!: string | null;
  dueDate!: Date;
  id!: number;
  priority!: Priority;
  projectId!: number;
  status!: TaskStatus;
  title!: string;
  updatedAt!: Date;

  constructor(data: PrismaTask) {
    Object.assign(this, data);
  }
}
