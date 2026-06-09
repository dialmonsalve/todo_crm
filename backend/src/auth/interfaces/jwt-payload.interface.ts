import { Role } from '@generated-prisma/enums';

export interface JWTPayload {
  id: string;
  email: string;
  isActive: boolean;
  tokenVersion: number;
  globalTokenVersion: number;
  role: Role;

  iat?: number;
  exp?: number;
}
