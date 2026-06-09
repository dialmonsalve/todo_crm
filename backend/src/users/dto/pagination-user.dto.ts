import { IntersectionType } from '@nestjs/mapped-types';

import { PaginationDto } from '@cDto/paginate.dto';
import { BaseQueryDto } from '@cDto/base-query.dto';
import { OrderUserSortDto } from './order-user-sort.dto';

export class PaginationUserDto extends IntersectionType(
  PaginationDto,
  BaseQueryDto,
  OrderUserSortDto
) {}
