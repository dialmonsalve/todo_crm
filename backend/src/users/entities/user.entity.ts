import { Type } from 'class-transformer';
import {
  User as PrismaUser,
  Profile as PrismaProfile,
  Role as PrismaRole,
  Role,
} from '@generated-prisma/client';
import { Profile as ProfileEntity } from '../../profile/entities/profile.entity';

export class User implements PrismaUser {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  isTwoFactorEnabled!: boolean;
  requirePasswordChange!: boolean;
  tokenVersion!: number;
  twoFactorSecret!: string | null;
  isActive!: boolean;
  createdById!: string | null;
  updatedById!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  role!: Role;

  @Type(() => ProfileEntity)
  profile!: ProfileEntity | null;

  constructor(
    data: PrismaUser & { profile?: PrismaProfile | null; role?: PrismaRole }
  ) {
    Object.assign(this, data);

    if (data.profile) {
      this.profile = new ProfileEntity(data.profile);
    }
  }
}
