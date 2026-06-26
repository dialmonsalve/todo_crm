import { Project } from '../entities/project.entity';

import { Task } from '../../tasks/entities/task.entity';

import type { IProjectResponseDto, ProjectWithRelations } from '../interfaces';
import { Customer } from 'src/customers/entities/customer.entity';

export class CustomerMapper {
  /**
   *  Transform what comes from Prisma (DB) to the Domain Entity
   */
  static toDomain(raw: ProjectWithRelations): Project {
    const project = new Project(raw);

    raw.tasks = new Task(raw.tasks);
    raw.client = new Customer(raw.client);

    return project;
  }

  /**
   * Transform the Entity into a response DTO (cleaning sensitive data)
   */
  static toResponse(project: Project): IProjectResponseDto {
    return {
      id: project.id,
      name: project.name,
      createdAt: project.createdAt,
      description: project.description,
      updatedAt: project.updatedAt,
      customer: project.customer,
      tasks: project.tasks,
    };
  }
}
