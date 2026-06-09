import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { envs } from 'src/config/envs';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTStrategy,
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
  ],

  exports: [JWTStrategy, PassportModule, JwtModule],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
})
export class AuthModule {}
