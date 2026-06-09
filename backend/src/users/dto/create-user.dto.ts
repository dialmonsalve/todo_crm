import {
  IsEmail,
  IsString,
  MinLength,
  ValidateNested,
  Matches,
  IsDefined,
  IsNotEmptyObject,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@generated-prisma/enums';
import { i18nValidationMessage } from 'nestjs-i18n';

import { CreateProfileDto } from '../../profile/dto/create-profile.dto';

export class CreateUserDto {
  @IsString({ message: i18nValidationMessage('user.USERNAME_STRING') })
  @MinLength(3, {
    message: i18nValidationMessage('user.USERNAME_LONGER'),
  })
  @Matches(/^\S+$/, {
    message: i18nValidationMessage('user.USERNAME_NON_WHITE_SPACE'),
  })
  username!: string;

  @IsEmail({}, { message: i18nValidationMessage('user.EMAIL') })
  email!: string;

  @IsString({ message: i18nValidationMessage('user.PASSWORD_STRING') })
  @MinLength(8, { message: i18nValidationMessage('user.PASSWORD_SHORTER') })
  @Matches(
    /^(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,})(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
    {
      message: i18nValidationMessage('user.PASSWORD_WEAK'),
    }
  )
  password!: string;

  @IsEnum(Role, {
    message: i18nValidationMessage('common.INVALID_ENTITY_TYPE', {
      entity: Object.values(Role).join(', '),
    }),
  })
  role!: Role;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDefined({ message: i18nValidationMessage('user.PROFILE_REQUIRED') })
  @IsNotEmptyObject(
    {},
    { message: i18nValidationMessage('user.PROFILE_EMPTY') }
  )
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile!: CreateProfileDto;
}
