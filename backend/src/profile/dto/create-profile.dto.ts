import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProfileDto {
  @IsString({ message: i18nValidationMessage('profile.NAME_STRING') })
  @MinLength(3, { message: i18nValidationMessage('profile.NAME_SHORT') })
  @MaxLength(50, { message: i18nValidationMessage('profile.NAME_LONG') })
  name!: string;

  @IsString({ message: i18nValidationMessage('profile.LAST_NAME_STRING') })
  @MinLength(2, { message: i18nValidationMessage('profile.LAST_NAME_SHORT') })
  @MaxLength(60, { message: i18nValidationMessage('profile.LAST_NAME_LONG') })
  lastName!: string;

  @IsString({ message: i18nValidationMessage('profile.PHONE_STRING') })
  @MinLength(7, { message: i18nValidationMessage('profile.PHONE_SHORT') })
  @MaxLength(12, { message: i18nValidationMessage('profile.PHONE_LONG') })
  @IsOptional()
  phone?: string;

  @IsString({ message: i18nValidationMessage('profile.ADDRESS_STRING') })
  @IsOptional()
  @MaxLength(50, { message: i18nValidationMessage('profile.ADDRESS_LONG') })
  address?: string;

  @IsString({ message: i18nValidationMessage('profile.AVATAR_STRING') })
  @IsOptional()
  avatar?: string;
}
