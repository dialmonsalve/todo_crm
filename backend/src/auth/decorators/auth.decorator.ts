import { applyDecorators, SetMetadata } from '@nestjs/common';

import { Role } from '@generated-prisma/enums';

export const ROLES_KEY = 'auth';

export function Auth(roles: Role[] = []) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles));
}
