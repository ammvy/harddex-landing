import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  FIREBASE_SERVICE_ACCOUNT_PATH: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
});

export const env = envSchema.parse(process.env);
