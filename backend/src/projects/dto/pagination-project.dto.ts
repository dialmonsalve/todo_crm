import { IntersectionType } from '@nestjs/mapped-types';

import { PaginationDto } from '@cDto/paginate.dto';
import { BaseQueryDto } from '@cDto/base-query.dto';
import { OrderProjectSortDto } from './order-project-sort.dto';

export class PaginationProjectDto extends IntersectionType(
  PaginationDto,
  BaseQueryDto,
  OrderProjectSortDto
) {}
