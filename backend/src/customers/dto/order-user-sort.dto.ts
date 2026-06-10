import { IsIn, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

import { BaseSortDto } from '@cDto/base-sort.dto';
import { ALLOWED_SORT_CUSTOMER_FIELDS } from '../interfaces';

export class OrderUserSortDto extends BaseSortDto {
  @IsOptional()
  @IsIn(ALLOWED_SORT_CUSTOMER_FIELDS, {
    message: i18nValidationMessage('common.INVALID_SORT_FIELD', {
      validFields: ALLOWED_SORT_CUSTOMER_FIELDS.toString(),
    }),
  })
  sortBy?: (typeof ALLOWED_SORT_CUSTOMER_FIELDS)[number];
}
