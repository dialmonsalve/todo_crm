import {
  User as PrismaUser,
  Role as PrismaRole,
  Profile as PrismaProfile,
} from 'src/common/database/generated/prisma/client';
import { User } from '../entities/user.entity';
import { Profile } from '../../profile/entities/profile.entity';

import { IUserResponseDto } from '../interfaces';

type PrismaUserWithRelations = PrismaUser & {
  profile?: PrismaProfile | null;
  role?: PrismaRole;
};

export class UserMapper {
  /**
   *  Transform what comes from Prisma (DB) to the Domain Entity
   */
  static toDomain(raw: PrismaUserWithRelations): User {
    const user = new User(raw);

    if (raw.profile) {
      user.profile = new Profile(raw.profile);
    }

    return user;
  }

  /**
   * Transform the Entity into a response DTO (cleaning sensitive data)
   */
  static toResponse(user: User): IUserResponseDto {
    return {
      id: user.id,
      name: user.profile?.name,
      lastName: user.profile?.lastName,
      username: user.username,
      email: user.email,
      address: user.profile?.address,
      avatar: user.profile?.avatar,
      phone: user.profile?.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdById: user.createdById,
      updatedById: user.updatedById,
    };
  }
}
