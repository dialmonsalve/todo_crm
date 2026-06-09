import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { ROLES_KEY } from '../decorators/auth.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

import { Role } from '@generated-prisma/enums';

import { IUserRequest } from '../../users/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly i18n: I18nService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const { user } = context.switchToHttp().getRequest<IUserRequest>();
    const notAuthenticatedMessage = this.i18n.t('auth.NOT_AUTHENTICATED', {
      lang: I18nContext.current()?.lang,
    });

    if (!user)
      throw new UnauthorizedException({
        message: [notAuthenticatedMessage],
        error: 'Unauthorized',
        statusCode: 401,
      });

    if (user.role === Role.SUPER_ADMIN) return true;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );  

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const hasRole = requiredRoles.includes(user.role);

    const forbiddenMessage = this.i18n.t('auth.FORBIDDEN_EXCEPTION', {
      lang: I18nContext.current()?.lang,
    });

    if (!hasRole) {
      throw new ForbiddenException({
        message: [forbiddenMessage],
        error: 'Forbidden',
        statusCode: 403,
      });
    }

    return true;
  }
}
