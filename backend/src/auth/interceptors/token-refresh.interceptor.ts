import { Reflector } from '@nestjs/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

import type { IUserRequest } from '../interfaces/user.request.interface';
import type { Response } from 'express';
import type { JWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return next.handle();

    const request = context.switchToHttp().getRequest<IUserRequest>();
    const response = context.switchToHttp().getResponse<Response>();
    const user = request.user;

    if (user && user.exp) {
      const secondsLeft = user.exp - Math.floor(Date.now() / 1000);

      if (secondsLeft < 1800 && secondsLeft > 0) {
        const newPayload: JWTPayload = {
          id: user.id,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          tokenVersion: user.tokenVersion,
          globalTokenVersion: user.globalTokenVersion,
        };
        const newToken = this.jwtService.sign(newPayload);

        response.setHeader('Authorization-New', `Bearer ${newToken}`);
        response.setHeader(
          'Access-Control-Expose-Headers',
          'Authorization-New'
        );
      }
    }

    return next.handle();
  }
}
