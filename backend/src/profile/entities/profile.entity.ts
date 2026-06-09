import { Exclude } from 'class-transformer';
import { Profile as PrismaProfile } from 'src/common/database/generated/prisma/client';

export class Profile implements PrismaProfile {
  @Exclude()
  id: number;

  name: string;

  lastName: string;

  phone: string | null;

  address: string | null;

  @Exclude()
  userId: string;

  avatar: string | null;

  @Exclude()
  updatedAt: Date;

  constructor(data: PrismaProfile) {
    this.id = data.id;
    this.name = data.name;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.address = data.address;
    this.userId = data.userId;
    this.avatar = data.avatar;
    this.updatedAt = data.updatedAt;
  }
}