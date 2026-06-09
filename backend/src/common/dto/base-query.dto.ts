import { IntersectionType } from '@nestjs/mapped-types';
import { IsActiveQueryDto } from './is-active-query.dto';
import { SearchQueryDto } from './search-query.dto';

export class BaseQueryDto extends IntersectionType(
  IsActiveQueryDto,
  SearchQueryDto
) {}
