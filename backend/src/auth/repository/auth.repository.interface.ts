import { LoginUserDto } from '../dto/login-user.dto';

export interface LoginResponse {
  token: string;
}

export interface IAuthRepository {
  login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
}
