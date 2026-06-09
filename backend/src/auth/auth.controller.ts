import { Body, Controller, Post } from '@nestjs/common';

import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

import { type LoginResponse } from './repository/auth.repository.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @Public()
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }
}
