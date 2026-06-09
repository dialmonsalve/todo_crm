import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { I18nService, I18nContext } from 'nestjs-i18n';

import { PrismaService } from '@cDatabase/prisma.service';
import { envs } from '@config/envs';

import { type JWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService
  ) {
    const secretOrKey = envs.JWT_SECRET;

    super({
      secretOrKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    const lang = I18nContext.current()?.lang ?? 'es';
    if (!payload.isActive) {
      const message = this.i18n.t('auth.CREDENTIALS_ERROR', {
        lang,
      });
      throw new UnauthorizedException({ message: [message] });
    }

    const [user, appConfig] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: payload.id },
        select: { tokenVersion: true, isActive: true },
      }),
      this.prisma.appSecurityConfig.findUnique({
        where: { id: 1 },
      }),
    ]);

    if (
      !appConfig ||
      appConfig.globalTokenVersion !== payload.globalTokenVersion
    ) {
      const message = this.i18n.t('auth.GLOBAL_MAINTENANCE', { lang });
      throw new UnauthorizedException([message]);
    }

    if (!user || !user.isActive) {
      const message = this.i18n.t('auth.CREDENTIALS_ERROR', { lang });
      throw new UnauthorizedException({ message: [message] });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      const message = this.i18n.t('auth.SESSION_EXPIRED', { lang });
      throw new UnauthorizedException([message]);
    }

    return {
      ...payload,
    };
  }
}
