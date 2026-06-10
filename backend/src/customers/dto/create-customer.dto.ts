import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCustomerDto {
  @IsString({ message: i18nValidationMessage('customer.NAME_STRING') })
  @MinLength(3, { message: i18nValidationMessage('customer.NAME_MIN_LENGTH') })
  @MaxLength(150, {
    message: i18nValidationMessage('customer.NAME_MAX_LENGTH'),
  })
  name!: string;

  @IsOptional()
  @MinLength(3, {
    message: i18nValidationMessage('customer.COMPANY_MIN_LENGTH'),
  })
  @MaxLength(150, {
    message: i18nValidationMessage('customer.COMPANY_MAX_LENGTH'),
  })
  company?: string;

  @IsString({ message: i18nValidationMessage('customer.EMAIL_STRING') })
  @MinLength(3, { message: i18nValidationMessage('customer.EMAIL_MIN_LENGTH') })
  @IsEmail({}, { message: i18nValidationMessage('customer.EMAIL') })
  email!: string;

  @IsOptional()
  @MinLength(3, { message: i18nValidationMessage('customer.PHONE_MIN_LENGTH') })
  @MaxLength(15, {
    message: i18nValidationMessage('customer.PHONE_MAX_LENGTH'),
  })
  phone?: string;
}
