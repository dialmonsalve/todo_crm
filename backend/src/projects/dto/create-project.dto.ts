import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProjectDto {
  @IsString({ message: i18nValidationMessage('project.NAME_STRING') })
  @MinLength(3, { message: i18nValidationMessage('project.NAME_MIN_LENGTH') })
  @MaxLength(150, {
    message: i18nValidationMessage('project.NAME_MAX_LENGTH'),
  })
  name!: string;

  @IsOptional()
  @MinLength(10, {
    message: i18nValidationMessage('project.DESCRIPTION_MIN_LENGTH'),
  })
  @MaxLength(15, {
    message: i18nValidationMessage('project.DESCRIPTION_MAX_LENGTH'),
  })
  description?: string;

  @IsInt()
  @IsPositive()
  clientId!: number;
}
