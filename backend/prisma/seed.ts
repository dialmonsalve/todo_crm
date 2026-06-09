process.loadEnvFile();

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/common/database/generated/prisma/client';
import { createMany, deleteMany } from './data';
import { envs } from '@config/envs';

const config = {
  connectionString: envs.DATABASE_URL,
  max: 1,
};

const pool = new Pool(config);

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log('🚀 Start seed process...');

    await deleteMany(prisma);

    await createMany(prisma);

    console.log('✅ Seed successfully completed.');
  } catch (error) {
    console.error('❌ Crit error while seed:');
    const err = error as any;
    if (err?.code) {
      console.error(`Error code: ${err?.code}`);
    }
    console.error(err?.message || error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
    console.log('🔌 Connections are closed.');
  }
}

if (envs.NODE_ENV !== 'production') {
  main().then(() => process.exit(0));
} else {
  console.warn('⚠️ Seed has been canceled: This can execute');
}
