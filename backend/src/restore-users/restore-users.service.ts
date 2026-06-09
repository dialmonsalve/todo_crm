import { Injectable } from '@nestjs/common';

import { PrismaService } from '@cDatabase/prisma.service';

@Injectable()
export class RestoreUsersService {
  constructor(private readonly prisma: PrismaService) {}
  async revokeUserSessions(userId: string): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        tokenVersion: { increment: 1 },
      },
    });
    return { message: 'Todas las sesiones de este usuario han sido cerradas.' };
  }

  async emergencyAppShutdown(): Promise<{ message: string }> {
    await this.prisma.appSecurityConfig.update({
      where: { id: 1 },
      data: {
        globalTokenVersion: { increment: 1 },
      },
    });
    return { message: 'Mecanismo de revocación global ejecutado con éxito.' };
  }
}
