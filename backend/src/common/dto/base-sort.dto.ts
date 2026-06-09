import { IsEnum, IsOptional } from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

export class BaseSortDto {
  @IsOptional()
  @IsEnum(['asc', 'desc'], {
    message: i18nValidationMessage('common.INVALID_SORT_ORDER'),
  })
  order?: 'asc' | 'desc' = 'desc';
}
