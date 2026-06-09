import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginUserDto {
  @IsString({ message: i18nValidationMessage('user.USERNAME_STRING') })
  username!: string;

  @IsString({ message: i18nValidationMessage('user.PASSWORD_STRING') })
  password!: string;
}
