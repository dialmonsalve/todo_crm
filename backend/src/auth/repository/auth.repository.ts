import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService, I18nContext } from 'nestjs-i18n';

import { LoginUserDto } from '../dto/login-user.dto';
import { IAuthRepository } from './auth.repository.interface';
import { PrismaService } from '@cDatabase/prisma.service';
import { EncryptionService } from '@cServices/encryption.service';

import type { JWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService
  ) {}

  async login({
    username,
    password,
  }: LoginUserDto): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    const appConfig = await this.prisma.appSecurityConfig.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, globalTokenVersion: 1 },
    });

    const message = this.i18n.t('auth.CREDENTIALS_ERROR', {
      lang: I18nContext.current()?.lang,
    });

    if (!user) {
      throw new BadRequestException([message]);
    }

    const isValidPassword = this.encryptionService.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new BadRequestException([message]);
    }

    return {
      token: this.getJwtToken({
        id: user.id,
        email: user.email,
        role: user.role,
        globalTokenVersion: appConfig.globalTokenVersion,
        isActive: user.isActive,
        tokenVersion: user.tokenVersion,
      }),
    };
  }

  private getJwtToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload);
  }
}
