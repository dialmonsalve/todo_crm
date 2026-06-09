import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { envs } from '@config/envs';

import { PrismaClient } from './generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const url = envs.DATABASE_URL;

    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);

    super({
      log: envs.NODE_ENV === 'production' ? [] : ['query', 'info', 'warn', 'error'],
      adapter,
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('Error connecting to DB:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
