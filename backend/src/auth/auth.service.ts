import { Inject, Injectable } from '@nestjs/common';

import { LoginUserDto } from './dto/login-user.dto';

import type {
  LoginResponse,
  IAuthRepository,
} from './repository/auth.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository
  ) {}
  login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authRepository.login(loginUserDto);
  }
}
