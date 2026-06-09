process.loadEnvFile()
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(10),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  FRONTEND_URL: z.url().default("http://localhost:4321"),
  DB_USERNAME: z.string().min(3),
  DB_PASSWORD: z.string().min(3),
  DB_NAME: z.string().min(3),
  DB_ROOT_PASSWORD: z.string().min(3),
  DATABASE_URL: z.url(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error('❌ Error en las variables de entorno:');
  console.error(JSON.stringify(z.treeifyError(error), null, 2));
  process.exit(1);
}

export const envs = data;

