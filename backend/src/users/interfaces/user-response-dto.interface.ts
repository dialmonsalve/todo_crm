import { Role } from '@generated-prisma/enums';

export interface IUserResponseDto {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string | null;
  updatedById: string | null;
  name: string | undefined;
  lastName: string | undefined;
  address?: string | null;
  phone?: string | null;
  avatar?: string | null;
  role: Role;
}

export const ALLOWED_SORT_USER_FIELDS = [
  'id',
  'createdAt',
  'role',
  'name',
  'email',
  'createdBy',
  'updatedBy',
] as const;
