import { Reflector } from '@nestjs/core';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

import type { JWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly i18n: I18nService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest<TUser = JWTPayload>(err: Error, user: TUser | false) {
    if (err || !user) {
      const notAuthenticatedMessage = this.i18n.t('auth.NOT_AUTHENTICATED', {
        lang: I18nContext.current()?.lang,
      });
      throw (
        err ||
        new UnauthorizedException({
          message: [notAuthenticatedMessage],
          error: 'Unauthorized',
          statusCode: 401,
        })
      );
    }
    return user;
  }
}
